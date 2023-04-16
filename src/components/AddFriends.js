import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { Home } from "./Home";
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";

export function AddFriends () {
    const { user } = useAuth();
     function getData(){
        let chats;
         axios.get('https://api.chatengine.io/chats/', {
                headers:{
                    "project-id": "f9e47d2b-eca9-4ba4-afc5-41dd9a901f93",
                    "user-name": user.email,
                    "user-secret":user.uid
                }
            }).then((response) => {
                chats = response.data[0]
            })
            .catch((error)=>console.log(error.message))
            return chats
    }
    let data =  getData()
    console.log(data)
    return (
        <div>
            <Home/>
            <h1>Add Friends</h1>
            <p>{data}</p>
        </div>
    );
}