import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { Home } from "./Home";
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";


// put chat name in a map and chat people in a list as an attribute
//test in a list first
//map next


export function AddFriends() {
    const { user } = useAuth();
    let allPeople = {};

    useEffect(() => {
        async function getData() {
            await axios.get('https://api.chatengine.io/chats/', {
                headers: {
                    "project-id": "271fe4e8-950e-44b3-92cb-24d0ee33a5a2",
                    "user-name": user.displayName,
                    "user-secret": user.uid
                }
            }).then((response) => {
                for (var chats of response.data) {
                    // differentiate between chats and check if chat name is a duplicate
                    allPeople[chats.title] = [];
                    for (var personData of chats.people) {
                        allPeople[chats.title].push(`${personData.person.first_name} ${personData.person.last_name} (${personData.person.username})`)
                    }
                }
                console.log(allPeople)
                //map chat title names to people names
                const container = document.getElementById('container');


                for (const chatName in allPeople) {
                    if (allPeople.hasOwnProperty(chatName)) {
                        const chatTitle = document.createElement('h1');
                        chatTitle.setAttribute('class', 'friends-h1')
                        chatTitle.innerText = chatName;
                        container.appendChild(chatTitle);

                        const membersList = document.createElement('ul');
                        membersList.setAttribute('class', 'friends-ul')
                        for (const member of allPeople[chatName]) {
                            const memberItem = document.createElement('li');
                            memberItem.setAttribute('class', 'friends-li')
                            memberItem.innerText = member;
                            membersList.appendChild(memberItem);
                        }
                        container.appendChild(membersList);
                    }
                }

            })
                .catch((error) => console.log(error.message))
        }
        getData()
    });

    return (
        <div>
            <Home />
            {/* <button onClick={getData}>Add Friends</button> */}
            <div id="container"></div>
        </div>
    );
}