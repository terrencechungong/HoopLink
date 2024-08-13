import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabase-conf/supabase-conf";

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
                setUser(null);
            } else {
                setUser(session.user);
                console.log("Authentication state changed:", event);
            }
        });

        // Cleanup subscription on component unmount
        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const value = { user };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}