import {auth, database} from "../backend/firebase"
import { ref, set, child, update, remove, orderByChild, equalTo, query, get } from "firebase/database";
import { User } from "./domain/User";
import { useHistory } from 'react-router-dom';

export class Validation {
    static async validate_username(username) {
        if (!username.includes("@")) {
            var getUsernameinDB = query(ref(database, "Users/"), orderByChild("username"), equalTo(username));
            let dbQuery = await get(getUsernameinDB);
            var user = [];
            dbQuery.forEach(snap => { user.push(snap.val()); });
            if (user.length > 0) {
                alert("A user with this username already exists. Please use a different username or log in.");
                return false;
            } else {
                return true;
            }
        }
        alert('Username cannot contain @.');
        return false;
    }

    static async validate_email(email) {
        const expression = /^[^@]+@\w+(\.\w+)+\w$/;
        if (expression.test(email) == true) {
            var getEmailinDB = query(ref(database, "Users/"), orderByChild("email"), equalTo(email));
            let dbQuery = await get(getEmailinDB);
            var user = [];
            dbQuery.forEach(snap => { user.push(snap.val()); });
            if (user.length > 0) {
                alert("A user with this email already exists. Please use a different email or log in.");
                return false;
            } else {
                return true;
            }
        }
        alert("Invalid email format.")
        return false;
    }

    static validate_password(password1, password2) {
        if (password1 != password2) {
            alert('"Password" and "Re-enter Password" fields must recieve the same input.');
        }
        if (password1.length < 6) {
            alert("Password must be at least 6 characters.");
            return false;
        } else {
            return true;
        }
    }

    static validate_field(field) {
        if (field.length <= 0 || field == null) {
            return false;
        }
        return true;
        //add logic to ensure that ther is content in the field not white spaces
    }

    static async register(firstName, lastName, username, emailAddress, phoneNumber, password1, password2) {
        var newUser = new User(firstName, lastName, username, emailAddress, phoneNumber);
        if (await Validation.validate_email(emailAddress) == false || Validation.validate_password(password1, password2) == false
            || await Validation.validate_username(username) == false) {
            //fix alert messages fix "email already in use" error
            return
        } if (false == Validation.validate_username(username)) {
            return;
        }
        if (Validation.validate_field(firstName) && Validation.validate_field(lastName) &&
            Validation.validate_field(username) && Validation.validate_field(emailAddress) && Validation.validate_field(phoneNumber)) {
            auth.createUserWithEmailAndPassword(emailAddress, password1)
                .then(() => {
                    set(ref(database, "Users/" + auth.currentUser.uid), newUser)
                    alert('user created')
                })
                .catch((error) => { alert(error.message); })
        } else {
            alert('1 or more is empty')
        }
    }

    static async signIn(signInInput, password) {
        //add logic that allows google/fb authentication and binds that account to a user instance.
        if (!signInInput.includes("@")) {
            var getUsernameinDB = query(ref(database, "Users/"), orderByChild("username"), equalTo(signInInput));
            let dbQuery = await get(getUsernameinDB);
            var user = [];
            dbQuery.forEach(snap => { user.push(snap.val()); });
            signInInput = user[0].email;
        }

        return auth.signInWithEmailAndPassword(signInInput, password).
            then(() => {
                update(ref(database, "Users/" + auth.currentUser.uid), {last_login: Date.now()});
                return false;
            })
            .catch((error) => {
                console.log(error.message)
                return true;
            })
    }
}