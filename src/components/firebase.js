import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/database';
import {getDatabase, ref, set, child, update, remove} from 'firebase/database';


export const app = firebase.initializeApp({
  apiKey: "AIzaSyADucVSJpF0BBSZetA02kqd4Rf6zjk3mCM",
  authDomain: "mvp-chat-fe944.firebaseapp.com",
  projectId: "mvp-chat-fe944",
  storageBucket: "mvp-chat-fe944.appspot.com",
  messagingSenderId: "736397972874",
  appId: "1:736397972874:web:7e2c357409cf8576806473"
});

//import auth???
export const auth = app.auth();
export const database = getDatabase();