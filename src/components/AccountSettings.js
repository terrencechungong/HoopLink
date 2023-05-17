import { Home } from './Home';
import { useAuth } from '../components/contexts/AuthContexts';
import { auth, database } from './firebase';
import axios from "axios";
import { ref, set, update, query, get, orderByChild, equalTo } from 'firebase/database';
import { useState, useEffect } from "react";

export function AccountSettings() {
    const { user } = useAuth();
    const [data, setData] = useState({});

    useEffect(() => {
        async function grabUserData() {
            var getEmailinDB = query(ref(database, "Users/"), orderByChild("email"), equalTo(user.email));
            let dbQuery = await get(getEmailinDB);
            dbQuery.forEach(snap => {
                setData(snap.val());
                let username = document.getElementById('first_name');
                username.setAttribute('value', snap.val().first_name);
                let firstName = document.getElementById('last_name');
                firstName.setAttribute('value', snap.val().last_name);
                let lastName = document.getElementById('phone_number');
                lastName.setAttribute('value', snap.val().phone_number);
            }
            );

        }
        grabUserData();
    }, []);

    function saveChanges() {
        //remove white spaces
        //allow username and email changes but put validation for it.
        var firstName = document.getElementById("first_name").value.trim();
        var lastName = document.getElementById("last_name").value.trim();
        var phoneNumber = document.getElementById("phone_number").value.trim();
        let updateData = {first_name: firstName,
            last_name: lastName,
            
        }
        axios.get('https://api.chatengine.io/users/me/', {
                headers: {
                    "project-id": "271fe4e8-950e-44b3-92cb-24d0ee33a5a2",
                    "user-name": user.email,
                    "user-secret": user.uid
                }
            }, {})

    }


    return (
        <div>
            <Home />
            <div className="settings-container">
                <h1 className='settings-h1'>Profile Settings</h1>
                <form className='settings-form'>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input disabled className="settings-input" type="text" id="username" name="username" value={data.username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Email</label>
                        <input disabled className="settings-input" type="text" id="email" name="username" value={data.email} />
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
                    <button className='settings-submit-button' type="submit" onClick={saveChanges}>Save Changes</button>

                </form>
                {/* <button onClick={saveChanges}></button> */}
                {/* <button onClick={grabUserData}>YO</button> */}
            </div>
        </div>
    )
}