import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ref, set, update, query, get, orderByChild, equalTo } from 'firebase/database';
import { auth, database } from './firebase';
import { FriendRequest } from './domain/User';

export class FriendRequests {
    static async sendRequest(index) {
        let receiver = document.getElementById(`email_${index}`).innerText;
        let request = new FriendRequest(auth.currentUser.email, receiver)
        set(ref(database, "FriendRequest/" + uuidv4()), request);
    }

    static async acceptRequest(index) {
        const sender = document.getElementById(`email_${index}`).innerText;
        const queryRef = ref(database, "FriendRequest/");
        const query_ = query(
            queryRef,
            orderByChild("receiver"),
            equalTo(auth.currentUser.email),
        );

        get(query_).then((snapshot1) => {

            snapshot1.forEach((snap) => {
                if (snap.val().sender == sender && snap.val().is_active == true) {
                    update(ref(database, "FriendRequest/" + snap.key), { is_active: false });
                }
            })
        });

        var senderData = {}
        var sendersUid = "";
        var userData = {};
        const queryTwo = query(ref(database, "Users/"), orderByChild("email"), equalTo(sender));
        try {
            const snapshotTwo = await get(query(queryTwo));

            snapshotTwo.forEach(async (snap2) => {
                sendersUid = snap2.key;
                senderData = {
                    "first_name": snap2.val().first_name,
                    "last_name": snap2.val().last_name,
                    "email": sender
                };

                const userRef = ref(database, `Users/`);
                const userSnapshot = await get(query(userRef, orderByChild("email"), equalTo(auth.currentUser.email)));

                userSnapshot.forEach((s) => {
                    const usersFriends = s.val().friends || [];
                    usersFriends.push(senderData);
                    update(ref(database, `Users/${auth.currentUser.uid}`), { friends: usersFriends });
                    console.log(s.val())
                    userData = {
                        "first_name": s.val().first_name,
                        "last_name": s.val().last_name,
                        "email": auth.currentUser.email
                    };
                });
                const senderFriends = snap2.val().friends || [];
                senderFriends.push(userData);
                console.log(userData)
                console.log(update(ref(database, `Users/${sendersUid}`), { friends: senderFriends }));
            });
            // Code after the forEach loop, which will execute after all iterations complete
        } catch (error) {
            alert("Error: ", error);
        }
    }

    static async denyRequest(index) {
        let sender = document.getElementById(`email_${index}`).innerText;
        const query_ = query(
            ref(database, "Users/"), orderByChild("sender"), equalTo(sender)
        );
        const response = await get(query_)
        response.forEach((snap) => {
            update(ref(database, "FriendRequest/" + snap.key), { is_active: false });
        }).catch((error) => {
            alert("errorr")
        });
    }

    static async removeFriend(index) {
        const friend = document.getElementById(`email_${index}`).innerText;
        var friendData = {}
        var friendsUid = "";
        var userData = {};
        const query_ = query(ref(database, "Users/"), orderByChild("email"), equalTo(friend));
        try {
            const snapshot = await get(query(query_));

            snapshot.forEach(async (snap) => {
                friendsUid = snap.key;
                friendData = {
                    "first_name": snap.val().first_name,
                    "last_name": snap.val().last_name,
                    "email": friend
                };

                const userRef = ref(database, `Users/`);
                const userSnapshot = await get(query(userRef, orderByChild("email"), equalTo(auth.currentUser.email)));

                userSnapshot.forEach((s) => {
                    let usersFriends = s.val().friends || [];
                    if (usersFriends == []) {
                        return;
                    }
                    usersFriends = usersFriends.filter((data) => { data.email != friendData.email })
                    update(ref(database, `Users/${auth.currentUser.uid}`), { friends: usersFriends });
                    userData = {
                        "first_name": s.val().first_name,
                        "last_name": s.val().last_name,
                        "email": auth.currentUser.email
                    };
                });
                let friendFriends = snap.val().friends || [];
                if (friendFriends == []) {
                    return;
                }
                friendFriends = friendFriends.filter((data) => data.email !== userData.email)
                console.log(update(ref(database, `Users/${friendsUid}`), { friends: friendFriends }));
            });
            // Code after the forEach loop, which will execute after all iterations complete
        } catch (error) {
            alert("Error: ", error);
        }
    }

    static async getRelationshipData() {
        let noConnection_ = [];
        let sentRequests_ = [];
        let receivedRequests_ = [];
        let friends_ = [];

        // Fetch sent requests  -- change to hash map
        const sentRequestsQuery = query(ref(database, "FriendRequest/"), orderByChild("sender"), equalTo(auth.currentUser.email));
        const sentRequestsSnapshot = await get(sentRequestsQuery);
        sentRequestsSnapshot.forEach((snap) => {
            if (snap.val().is_active == true) {
                sentRequests_.push(snap.val());
            }
        });


        // Fetch received requests. change query to only fetch active ones after it starts working
        const receivedRequestsQuery = query(ref(database, "FriendRequest/"), orderByChild("receiver"), equalTo(auth.currentUser.email));
        const receivedRequestsSnapshot = await get(receivedRequestsQuery);
        receivedRequestsSnapshot.forEach((snap) => {
            if (snap.val().is_active == true) {
                receivedRequests_.push(snap.val());
            }
        });

        const friendsQuery = query(ref(database, "Users/"), orderByChild("email"), equalTo(auth.currentUser.email));
        const friendsSnapshot = await get(friendsQuery);
        friendsSnapshot.forEach((snap) => {
            for (let i = 0; i < snap.val().friends.length; i++) {
                friends_.push(snap.val().friends[i]);
            }
        });

        // Fetch data from API
        const apiPromise = axios.get('https://api.chatengine.io/chats/', {
            headers: {
                "project-id": "02a9053b-e45f-463f-9628-a8ea4b4f4164",
                "user-name": auth.currentUser.email,
                "user-secret": auth.currentUser.uid
            }
        });

        // Wait for all promises to resolve
        const [apiResponse] = await Promise.all([apiPromise]);


        // Process API response no connections
        for (var chats of apiResponse.data) {
            for (var personData of chats.people) {
                if (sentRequests_.some((request) =>
                    request.is_active === true &&
                    request.receiver === personData.person.username &&
                    request.sender === auth.currentUser.email)) {
                    continue;
                }
                if (receivedRequests_.some(request =>
                    request.is_active === true &&
                    request.receiver === auth.currentUser.email &&
                    request.sender === personData.person.username
                )) {
                    // The condition is true, request with the specified criteria exists in the set
                    continue;
                }
                if (friends_.some(friend =>
                    friend.firstName === personData.person.first_name &&
                    friend.lastName === personData.person.last_name &&
                    friend.email === personData.person.username
                )) {
                    // The condition is true, friend with the specified criteria exists in the set
                    continue;
                }
                if (personData.person.username == auth.currentUser.email) { continue; }
                noConnection_.push({
                    "firstName": personData.person.first_name,
                    "lastName": personData.person.last_name,
                    "email": personData.person.username,
                    "chat": chats.title
                });
            }
        }
        return [noConnection_, sentRequests_, receivedRequests_, friends_];
    }
}

