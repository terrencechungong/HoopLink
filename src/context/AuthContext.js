import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-conf/supabase-conf";
import { useLazyQuery } from "@apollo/client";
import { GET_USER_ID_FROM_AUTH_ID } from "../components/graphql/queries/UserQueries";

const AuthContext = createContext({});
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check active session and set user
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session) {
                setUser(session.user);
            }
        });

        // Listen for authentication state changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            if (!session) {
                console.log("dam")
                setUser(null);
            } else {
                setUser(session.user);
                // console.log(session.user)
                console.log("Authentication state changed:", event);
                console.log(session.user.id)
            }
        });

        // Cleanup subscription on component unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const getUser = async () => {
        return await supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                return session.user;
            }
            return null
        });
    }

    const value = {
        user,
        getUser: getUser
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}