import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { decodeJwt } from '../services/auth';
import type { User } from '../types';

interface AuthContextValue {
  user: User | null;
  token: string | null;
  signin: (token: string) => void;
  signout: () => void;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [user, setUser] = useState<User | null>(null);

  const parseUser = useCallback((t: string | null) => {
    if (!t) {
      setUser(null);
      return;
    }
    const decoded = decodeJwt(t);
    if (decoded) {
      setUser({
        id: decoded.id || decoded._id || '',
        email: decoded.email || '',
        name: decoded.name,
        role: decoded.role || 'user',
      });
    } else {
      setUser(null);
    }
  }, []);

  useEffect(() => {
    parseUser(token);
  }, [token, parseUser]);

  const signin = (t: string) => {
    setToken(t);
    localStorage.setItem('token', t);
  };

  const signout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, signin, signout, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
