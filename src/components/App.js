import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { AccountSettings } from "./AccountSettings";
import { AuthProvider } from "./contexts/AuthContexts"
import { Home } from './Home';
import Chats from "./Chats"
import { Stats } from "../Stats";
import Login from "./Login"
import Signup from './SignUp';
import { NewGame } from "./NewGame";
import {AddFriends} from "./AddFriends.js";


function App() {
  return (
    <div style={{ fontFamily: 'Avenir' }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/addFriends" component={AddFriends} />
            <Route path="/chats" component={Chats} />
            <Route path="/newGame" component={NewGame} />
            <Route path="/stats" component={Stats} />
            <Route path="/login" component={Login} exact />
            <Route path="/signUp" component={Signup}/>
            <Route path="/accountSettings" component={AccountSettings}/>
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

// When you run the app you will be taken to a blank page. To use the app, go to /login

export default App
