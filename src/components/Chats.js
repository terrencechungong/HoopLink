import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { currentUser } from "./Login";
import { PeopleSettings } from 'react-chat-engine';
import { auth, database } from './firebase';
import { useAuth } from '../components/contexts/AuthContexts';
import { ref, set, update, query, get, orderByChild, equalTo } from 'firebase/database';;

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true)

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
        if (!user) {
            history.push('/login')
            return;
        }
        console.log(user.photoURL.split(" ")[0])
        axios.get('https://api.chatengine.io/users/me', {
            headers: {
                "project-id": "271fe4e8-950e-44b3-92cb-24d0ee33a5a2",
                "user-name": user.displayName,
                "user-secret": user.uid
            }
        }).then(() => {
            setLoading(false);
        }).catch(() => {
            let formdata = new FormData();
            let first_last = user.photoURL.split(" ");
            formdata.append('username', user.displayName);
            formdata.append('first_name', first_last[0]);
            formdata.append('last_name', first_last[1]);
            formdata.append('email', user.email);
            formdata.append('secret', user.uid);

            axios.post('https://api.chatengine.io/users/', formdata, { headers: { "PRIVATE-KEY": "53c09ec1-8fbb-4d22-b220-f026026eb6b1" } })
                .then(() => setLoading(false))
                .catch((error) => (error.message))
        })
    }, [user, history])
    //figure out how to edit html to add game creation functionality

    if (!user || loading) return "Loading...";
    console.log(user)
    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    <a href="/home" style={{ textDecoration: "none", color: "white" }}>Chat MVP - Home</a>

                </div>
                <div onClick={handleLogout} className="logout-tab">
                    Logout
                </div>
            </div>
            <ChatEngine
                height="calc(100vh - 66px)"
                projectID="271fe4e8-950e-44b3-92cb-24d0ee33a5a2"
                userName={user.displayName}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;