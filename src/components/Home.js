import React from 'react';

import { GoogleOutlined, FacebookOutlined, SettingOutlined, FastForwardFilled } from '@ant-design/icons';
import { auth, database } from "../backend/firebase"
import { ref, set, child, update, remove, get, orderByChild, equalTo, query } from 'firebase/database';
import { validate_username } from './SignUp';
import { handleLogout } from './Chats';
import { useHistory } from 'react-router-dom';

export function Home() {

  const history = useHistory();
  const handleLogout = async () => {
    await auth.signOut();
    history.push('/login')
  }

  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-lg bg-body-tertiary" style={{ backgroundColor: "#292166" }}>
          <div class="container-fluid">
            <h1 class="navbar-brand" style={{ color: "white" }}><strong>Chat MVP</strong></h1>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation" style={{ backgroundColor: "white" }}>
              <span class="navbar-toggler-icon" ></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/chats" style={{ color: "white" }}>Chats</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="/addFriends" style={{ color: "white" }}>Add Friends</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/newGame" style={{ color: "white" }}>New Game</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/stats" style={{ color: "white" }}>My Stats</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/accountSettings" style={{ color: "white" }}>Account Settings</a>
                </li>
                <li class="nav-item">
                  <button class="nav-link" onClick={handleLogout} style={{ color: "white", background: "none", border: "none" }}>Logout</button>
                </li>

              </ul>
            </div>
          </div>
        </nav>
      </header>

    </div>
  );
}