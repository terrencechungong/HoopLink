// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJdeKA9OsEfdrkPkENFOxycR0q1rFla8Q",
  authDomain: "hoop-link.firebaseapp.com",
  projectId: "hoop-link",
  storageBucket: "hoop-link.appspot.com",
  messagingSenderId: "624623501187",
  appId: "1:624623501187:web:6fec00dbf70e72b29e80b6",
  measurementId: "G-Q2B6457PC7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);