"use client";

import { useRouter } from 'next/navigation'; // Import useRouter
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check local storage for login status
    return localStorage.getItem('isAuthenticated') === 'true';
  });

  const router = useRouter(); // Initialize useRouter

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // Save login status in local storage
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // Remove login status from local storage
    router.push('/'); // Redirect to the login page
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
