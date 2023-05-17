import React, { useRef, useState, useInsertionEffect, useEffect } from "react";
import { Home } from "./Home";
import { ChatRequest } from "../backend/ChatRequest";
import { useAuth } from '../components/contexts/AuthContexts';
import axios from "axios";

<<<<<<< HEAD
=======

// put chat name in a map and chat people in a list as an attribute
//test in a list first
//map next


>>>>>>> 2824966af450f1cfa42453bb83ccf3e9c2ee53c3
export function AddFriends() {
    const { user } = useAuth();
    let allPeople = {};

    useEffect(() => {
        ChatRequest.getData(user, {})
    }, []);

    return (
        <div>
            <Home />
            {/* <button onClick={getData}>Add Friends</button> */}
            <div id="container"></div>
        </div>
    );
}