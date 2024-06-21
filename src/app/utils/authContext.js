// utilities/authContext.js
import React, { useState, useEffect, createContext, useContext } from 'react';
import { auth } from './firebase';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    // Add more functions like register, login, logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
