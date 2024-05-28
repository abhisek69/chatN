import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../components/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from 'react-toastify';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            console.log("users",user)
        });
        return () => unsubscribe();
    }, []);

    const logout = async (userName) => {
        try {
            await signOut(auth);
            toast.success(`See you ${userName}😁😁`, { position: "bottom-center" });
        } catch (error) {
            toast.error("Error logging out", { position: "bottom-center" });
        }
    };

    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
