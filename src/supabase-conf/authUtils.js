import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { supabase } from './supabase-conf'
import { globalVariables } from "..";

export const signUp = async (email, password, firstName, lastName) => {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'http://localhost:3000/chats',
        },
    })
    if (error !== null) {
        return false;
    } else {
        console.log(data.user);
        return data.user
    }
    // console.log("data", data, "error", error);
    // return error === null;

}

export const signin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    const response = await fetch(`http://localhost:3030/getUser?authId=${data.user.id}`);
    const res = await response.json()
    console.log(res);
    localStorage.setItem('myData', JSON.stringify(res.user));
    // console.log("data", data, "error", error)
    return error === null;
}

export const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error === null;
}

// show error message