import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Al cargar la app, revisamos si hay un usuario guardado
        const savedUser = localStorage.getItem('user');
        if (savedUser && savedUser !== "undefined") {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error("Error parsing user context:", error);
                localStorage.removeItem('user');
                setUser(null);
            }
        } else {
            if (savedUser === "undefined") localStorage.removeItem('user');
            setUser(null);
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        window.dispatchEvent(new Event('authChange')); // Notify cart to reload
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('authChange')); // Notify cart to clear
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);