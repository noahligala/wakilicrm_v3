import React, { createContext, useContext, useState } from 'react';
import axios from 'axios'; // for making HTTP requests

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Failed to log in', error);
    }
  };

  const logout = async () => {
    try {
      const response = await axios.post('/api/login');
      if (response.status === 200) {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};