import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { Home } from "./Home";
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";


// put chat name in a map and chat people in a list as an attribute
//test in a list first
//map next


export function AddFriends () {
    const { user } = useAuth();
    let allPeople = {};

     async function getData(){
         await axios.get('https://api.chatengine.io/chats/', {
                headers:{
                    "project-id": "271fe4e8-950e-44b3-92cb-24d0ee33a5a2",
                    "user-name": user.email,
                    "user-secret":user.uid
                }
            }).then((response) => {
                for(var chats of response.data){
                    // differentiate between chats and check if chat name is a duplicate
                    allPeople[chats.title] = [];
                    for(var personData of chats.people){
                        allPeople[chats.title].push(`${personData.person.first_name} ${personData.person.last_name} (${personData.person.username})`)
                    }
                }
                console.log(allPeople)
                //map chat title names to people names
            })
            .catch((error)=>console.log(error.message))
    }

    return (
        <div>
            <Home/>
            <button onClick={getData}>Add Friends</button>
            <ul id="add-here"></ul>
        </div>
    );
}