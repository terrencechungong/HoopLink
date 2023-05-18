import axios from "axios";
import { ref, set, update, query, get, orderByChild, equalTo } from 'firebase/database';
import { auth, database } from './firebase'


export class ChatRequest {
  static async getChats(user) {
    try {
      const response = await axios.get('https://api.chatengine.io/users/me', {
        headers: {
          "project-id": "a1bc6c78-4617-4a6c-8506-443fea32c614",
          "user-name": user.email,
          "user-secret": user.uid
        }
      });
      return false;
    } catch (error) {
      let formData = new FormData();
      formData.append('email', user.email);
      formData.append('secret', user.uid);
      formData.append('username', user.email);
      try {
        const response = await axios.post('https://api.chatengine.io/users/', formData, {
          headers: {
            "PRIVATE-KEY": "a3b2049c-2cbf-4a77-a5b2-f5da75a35afc"
          }
        }).then((userJson) => { update(ref(database, "Users/" + user.uid), { chatEngine_id: userJson.data.id }); });
        return false;
      } catch (error) {
        throw new Error(error.message);
      }
    }
  }

  static async getData() {
    let chats = await axios.get('https://api.chatengine.io/chats/', {
      headers: {
        "project-id": "a1bc6c78-4617-4a6c-8506-443fea32c614",
        "user-name": user.email,
        "user-secret": user.uid
      }
    }).then((response) => {
      alert(response.data[0])
      return response.data[0];
    })
      .catch((error) => console.log(error.message))
    return chats

  }

  static async getData(user, allPeople) {
    await axios.get('https://api.chatengine.io/chats/', {
      headers: {
        "project-id": "a1bc6c78-4617-4a6c-8506-443fea32c614",
        "user-name": user.email,
        "user-secret": user.uid
      }
    }).then((response) => {
      for (var chats of response.data) {
        console.log(chats)
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

  static async grabUserData(email) {
    var getEmailinDB = query(ref(database, "Users/"), orderByChild("email"), equalTo(email));
    let dbQuery = await get(getEmailinDB);
    var returnn;
    let returnObject = dbQuery.forEach(snap => {
      returnn = snap.val();
      let idField = document.getElementById("hidden-id");
      idField.setAttribute('value', snap.val().chatEngine_id);
      let username = document.getElementById("username");
      username.setAttribute('value', snap.val().username);
      let first_name = document.getElementById('first_name');
      first_name.setAttribute('value', snap.val().first_name);
      let last_name = document.getElementById('last_name');
      last_name.setAttribute('value', snap.val().last_name);
      let phone_number = document.getElementById('phone_number');
      phone_number.setAttribute('value', snap.val().phone_number);
    }
    );
    return returnn;
  }

  static saveChanges(user) {
    var phoneNumber = document.getElementById("phone_number").value.trim();
    var id = document.getElementById("hidden-id").value;
    let updateData = {
      first_name: document.getElementById("first_name").value.trim(),
      last_name:  document.getElementById("last_name").value.trim(),
    }
//phone number??    
    axios.patch(`https://api.chatengine.io/users/${id}/`, updateData, {
      headers: { "PRIVATE-KEY": "a3b2049c-2cbf-4a77-a5b2-f5da75a35afc" }
    }).then(() => alert("Update Successful")).catch((error) => alert(error.message))
    update(ref(database, "Users/" + user.uid), updateData);
  }

}
