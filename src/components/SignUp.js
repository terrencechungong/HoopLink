import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth, database } from './firebase';
import {ref, set, child, update, remove,  orderByChild, equalTo, query, get} from 'firebase/database';

//turn error messages into messages under their boxes on the screen. Not alerts
//TODO: Add options to sign up with third party sites
//Turn to class based function. Add logic to display error messages.
//allow users to add a profile picture
async function register() {
  var firstName = document.getElementById("firstName").value;
  var lastName = document.getElementById("lastName").value;
  var username = document.getElementById("username").value;
  var emailAddress = document.getElementById("emailAddress").value;
  var phoneNumber = document.getElementById("phoneNumber").value;
  var password1 = document.getElementById("password1").value;
  var password2 = document.getElementById("password2").value;
  //validate username to ensure it is unique and email and phone number and make login functionality for all
  if (await validate_email(emailAddress) ==false || validate_password(password1, password2) == false||await validate_username(username)==false){
    //fix alert messages
    //fix "email already in use" error
    return 
  }if (false == validate_username(username)){
    return;
  }
  if(validate_field(firstName)&&validate_field(lastName)&&validate_field(username)&&validate_field(emailAddress)&&validate_field(phoneNumber)){
    
    auth.createUserWithEmailAndPassword(emailAddress, password1)
    .then(() => {
        var user = auth.currentUser
        var user_data = {
          first_name : firstName,
          last_name : lastName,
          username : username,
          email : emailAddress,
          phone_number : phoneNumber,
          wins : 0,
          losses : 0,
          mvp_count : 0,
          last_login : Date.now()
        }//add logic to make extra features function as needed (fields)
        set(ref(database, "Users/"+user.uid),user_data)
        alert('user created')
    })
    .catch((error) => {
      alert(error.message);
    })
  }else{
    alert('1 or more is empty')
  }
}

export async function validate_username(username){
  if (!username.includes("@")) {
    var getUsernameinDB = query(ref(database, "Users/"), orderByChild("username"), equalTo(username));
    let dbQuery = await get(getUsernameinDB);
    var user = [];
    dbQuery.forEach(snap => {user.push(snap.val());});
    if(user.length > 0){
      alert("A user with this username already exists. Please use a different username or log in.");
      return false;
    }else{
      return true;
    }
  } 
  alert('Username cannot contain @.');
  return false;
}

async function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    var getEmailinDB = query(ref(database, "Users/"), orderByChild("email"), equalTo(email));
    let dbQuery = await get(getEmailinDB);
    var user = [];
    dbQuery.forEach(snap => {user.push(snap.val());});
    if(user.length > 0){
      alert("A user with this email already exists. Please use a different email or log in.");
      return false;
    }else{
        return true;
    }
  }
  alert("Invalid email format.") 
  return false;
}

function validate_password (password1, password2) {
  if(password1!=password2){
    alert('"Password" and "Re-enter Password" fields must recieve the same input.');
  }
  if (password1.length < 6 ){
    alert("Password must be at least 6 characters.");
    return false;
  }else{
    return true;
  }
}

function validate_field (field) {
  if(field.length <= 0 || field == null){
    return false;
  }
  return true;
  //add logic to ensure that ther is content in the field not white spaces
}

const Signup = () => {
    return (
      <div class="login-css">
        <section class="vh-100">
         <div class="container py-5 h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-9 col-xl-7">
              <div class="card bg-dark text-white card-registration" style={{borderRadius: "15px"}}>
                <div class="card-body p-4 p-md-5">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Sign Up</h3>
                  <p>Sign up for a chance to win MVP at your next pick up game!</p>
          
      
                    <div class="row">
                      <div class="col-md-6 mb-4">
      
                        <div class="form-outline">
                          <input type="text" id="firstName" class="transp form-control-lg" placeholder="First Name" />
                        </div>
      
                      </div>
                      <div class="col-md-6 mb-4">
      
                        <div class="form-outline">
                          <input type="text" id="lastName" class="transp form-control-lg"  placeholder='Last Name'/>
                        </div>
      
                      </div>
                    </div>
      
                    <div class="row">
                      <div class="col-md-6 mb-4 d-flex align-items-center">
      
                      <div class="form-outline">
                          <input type="text" id="username" class="transp form-control-lg" placeholder='Username' />
                        </div>
      
                      </div>
                      <div class="col-md-6 mb-4">
      
                       <div class="form-outline">
                          <input type="email" id="emailAddress" class="transp form-control-lg" placeholder='Email'/>
                        </div>
      
                      </div>
                    </div>
      
                    <div class="row">
                      <div class="col-md-6 mb-4 pb-2">
      
                      <div class="form-outline">
                          <input type="tel" id="phoneNumber" class="transp form-control-lg" placeholder='Phone number'/>
                        </div>
      
                      </div>
                      <div class="col-md-6 mb-4 pb-2">
      
                      <div class="form-outline">
                          <input type="password" id="password1" class="transp form-control-lg" placeholder='Password'/>
               
                        </div>
      
                      </div>
                    </div>
      
                    <div class="row">
                      <div class="col-md-6 mb-4">
      
                      <div class="form-outline">
                          <input type="password" id="password2" class="transp form-control-lg" placeholder='Re-enter password' />
                        </div>
      
                      </div>
                      
                    </div>
      
                    <div class="mt-4 pt-2">
                    <button class="btn btn-outline-light btn-lg px-5" onClick={register}>Sign Up</button>
                    </div>
                    <br/>
                    <div>
              <p class="mb-0">Already have an account? <a href="/login" class="text-white-50 fw-bold">Sign In</a>
              </p>
            </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
     </div>
    )
}

export default Signup;