import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { supabase } from './supabase-conf'

export const signUp = async (email, password, firstName, lastName) => {

    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: 'http://localhost:3000/chats',
        },
    })

    console.log("data", data, "error", error);
    return error === null;

}

export const signin = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    // console.log("data", data, "error", error)
    return error === null;
}

export const logOut = async () => {
    const { error } = await supabase.auth.signOut();
    return error === null;
}

// show error message