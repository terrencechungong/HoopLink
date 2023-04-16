import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from './firebase';
import { currentUser } from "./Login";
import { PeopleSettings } from 'react-chat-engine';
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";
const Chats = ()=> {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true)
    console.log(user);

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/login')
    }

    // const getFile = async (url) => {
    //     const response = await fetch(url);
    //     const data = await response.blob();
    //     return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    // }

    useEffect(() => {
        if(!user) {
            history.push('/login')
            return;
        }
        axios.get('https://api.chatengine.io/users/me', {
            headers:{
                "project-id": "f9e47d2b-eca9-4ba4-afc5-41dd9a901f93",
                "user-name": user.email,
                "user-secret":user.uid
            }
        }).then(() => {
            setLoading(false);
        }).catch(() => {
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('secret', user.uid);
            formdata.append('username', user.email);
            // formdata.append('custom_json', {"wins":currentUser.wins,"losses":currentUser.losses,"mvp_count":currentUser.mvp_count});
            axios.post('https://api.chatengine.io/users/', formdata, {headers: {"PRIVATE-KEY":"c784399d-3ff3-4366-b1ed-bd68a96ad42d"}})
            .then(() => setLoading(false))
            .catch((error) => (error.message))
        })
    }, [user,history])
    //figure out how to edit html to add game creation functionality

    if(!user||loading) return "Loading...";
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                <a href="/home" style={{textDecoration:"none", color:"white"}}>Chat MVP - Home</a>
                        
                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="f9e47d2b-eca9-4ba4-afc5-41dd9a901f93"
                userName={user.email}
                userSecret={user.uid}
                
                />
        </div>
    );
}

export default Chats;