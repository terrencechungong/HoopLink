import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { auth, database } from '../backend/firebase';
import { ref, set, child, update, remove, orderByChild, equalTo, query, get } from 'firebase/database';
import { User } from '../backend/domain/User';
import { Validation } from '../backend/Validations';

//turn error messages into messages under their boxes on the screen. Not alerts
//TODO: Add options to sign up with third party sites
//Turn to class based function. Add logic to display error messages.
//allow users to add a profile picture


const callRegister = () => {
  Validation.register(
    document.getElementById("firstName").value,
    document.getElementById("lastName").value,
    document.getElementById("username").value,
    document.getElementById("emailAddress").value,
    document.getElementById("phoneNumber").value,
    document.getElementById("password1").value,
    document.getElementById("password2").value
  );
}


const Signup = () => {
  return (
    <div class="login-css">
      <section class="vh-100">
        <div class="container py-5 h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-9 col-xl-7">
              <div class="card bg-dark text-white card-registration" style={{ borderRadius: "15px" }}>
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
                        <input type="text" id="lastName" class="transp form-control-lg" placeholder='Last Name' />
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
                        <input type="email" id="emailAddress" class="transp form-control-lg" placeholder='Email' />
                      </div>

                    </div>
                  </div>

                  <div class="row">
                    <div class="col-md-6 mb-4 pb-2">

                      <div class="form-outline">
                        <input type="tel" id="phoneNumber" class="transp form-control-lg" placeholder='Phone number' />
                      </div>

                    </div>
                    <div class="col-md-6 mb-4 pb-2">

                      <div class="form-outline">
                        <input type="password" id="password1" class="transp form-control-lg" placeholder='Password' />

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
                    <button class="btn btn-outline-light btn-lg px-5" onClick={callRegister}>Sign Up</button>
                  </div>
                  <br />
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