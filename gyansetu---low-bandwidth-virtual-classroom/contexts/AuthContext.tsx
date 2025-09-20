import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, UserRole } from '../types';
import * as authService from '../services/authService';
// Fix: Corrected import statement for react-router-dom.
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('gyansetu_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem('gyansetu_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gyansetu_user');
    }
  }, [user]);

  const login = async (email: string, password: string, role: UserRole) => {
    setLoading(true);
    setError(null);
    try {
      const loggedInUser = await authService.login(email, password, role);
      setUser(loggedInUser);
      if (loggedInUser.role === UserRole.Educator) {
        navigate('/educator/dashboard');
      } else {
        navigate('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
