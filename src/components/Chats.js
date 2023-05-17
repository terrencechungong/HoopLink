import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../backend/firebase";
import { currentUser } from "./Login";
import { ChatRequest } from "../backend/ChatRequest";
import { PeopleSettings } from 'react-chat-engine';
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";
import { getDefaultNormalizer } from "@testing-library/react";

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true)

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/login')
    }

    useEffect(() => {
        //fix it so user only has to click login once
        if (!user) {
            history.push('/login')
            return;
        }
        while (ChatRequest.getChats(user) == true) { setLoading(false); }
        setLoading(false)
    }, [user, history])

    if (!user || loading) return "Loading...";
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
                projectID="a1bc6c78-4617-4a6c-8506-443fea32c614"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
}

export default Chats;