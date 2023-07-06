import React, { createContext, useState } from 'react';

export const auth = createContext();

export const AuthProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);
    return (
        <auth.Provider value={{ isLogin, user, setUser, setIsLogin }}>
            {children}
        </auth.Provider>
    );
};
