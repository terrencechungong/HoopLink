import { Home } from './Home';
import { useAuth } from '../components/contexts/AuthContexts';
import { ChatRequest } from '../backend/ChatRequest';
import { auth, database } from '../backend/firebase';
import axios from "axios";
import { ref, set, update, query, get, orderByChild, equalTo } from 'firebase/database';
import { useState, useEffect } from "react";

export function AccountSettings() {
    const { user } = useAuth();
    useEffect(() => { ChatRequest.grabUserData(user.email); }, []);
    const callSaveChanges = () => { ChatRequest.saveChanges(user) }
    return (
        <div>
            <Home />
            <div className="settings-container">
                <h1 className='settings-h1'>Profile Settings</h1>
                <form className='settings-form'>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input disabled className="settings-input" type="text" id="username" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input disabled className="settings-input" type="text" id="email" name="username" value={user.email} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">First Name</label>
                        <input className="settings-input" type="text" id="first_name" name="username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Last Name</label>
                        <input className="settings-input" type="text" id="last_name" name="username"  />
                    </div>
                    <div className="form-group">
                        <label className="settings-label">Phone Number</label>
                        <input className="settings-input" id="phone_number"/>
                    </div>
                    {/* Put change password option */}
                    <div className="form-group">
                        <label className="settings-label">Password</label>
                        <a href="#" style={{ display: "block" }}>Click here to change your password</a>
                    </div>
                    <input disabled style={{display:"none"}} type="text" id="hidden-id" name="hidden-id" />
                    <button className='settings-submit-button' type="submit" onClick={callSaveChanges}>Save Changes</button>
                </form>
            </div>
        </div>
    )
}