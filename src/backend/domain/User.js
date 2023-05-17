import { Validation } from "../Validations";
import { auth } from '../firebase';
import { set, ref, database } from "firebase/database"

export class User {
    constructor(firstName, lastName, username, emailAddress, phoneNumber) {
        this.first_name = firstName;
        this.last_name = lastName;
        this.username = username;
        this.email= emailAddress
        this.phone_number = phoneNumber; 
        this.wins = 0;
        this.losses = 0;
        this.mvp_count = 0;
        this.last_login = Date.now();
    }
    //move this to the class
}

