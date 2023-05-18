import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { Home } from "./Home";
import { ChatRequest } from "../backend/ChatRequest";
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";

export function AddFriends() {
    const { user } = useAuth();
    let allPeople = {};

    useEffect(() => { ChatRequest.getData(user, {}) }, []);

    return (
        <div>
            <Home />
            {/* <button onClick={getData}>Add Friends</button> */}
            <div id="container"></div>
        </div>
    );
}