'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of a user object
interface User {
  name: string;
  email: string;
}

// Define the shape of the authentication context
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (user: User) => void;
  logout: () => void;
}

// Create the context with a default undefined value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the props for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// This is our mock auth provider
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for a logged-in user on initial load
  useEffect(() => {
    // In a real app, you might check localStorage or a cookie
    const storedUser = sessionStorage.getItem('taxai-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    // Simulate async check
    setTimeout(() => {
        setLoading(false);
    }, 500);
  }, []);

  // Mock login function
  const login = (userData: User) => {
    sessionStorage.setItem('taxai-user', JSON.stringify(userData));
    setUser(userData);
  };

  // Mock logout function
  const logout = () => {
    sessionStorage.removeItem('taxai-user');
    setUser(null);
  };

  const value = { user, loading, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
