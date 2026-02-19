'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// 1. Define the shapes of our data
interface User {
  _id: string;
  fullName: string;
  email: string;
  role: string;
  level?: number; // Optional: Gamification level
  avatarUrl?: string; // Optional: User avatar URL
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean; // For login/register actions
  register: (fullName: string, identity: string, password: string) => Promise<void>;
  login: (identity: string, password: string) => Promise<void>;
  logout: () => void;
}

// 2. Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

const getIdentityType = (identity: string): 'email' | 'phone_number' | 'unknown' => {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(identity)) return 'email';
  const phoneRegex = /^0\d{9}$/;
  if (phoneRegex.test(identity)) return 'phone_number';
  return 'unknown';
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState(true); // For initial auth check
  const [loading, setLoading] = useState(false); // For login/register actions
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      const storedToken = localStorage.getItem('authToken');
      if (storedToken) {
        setToken(storedToken);
        try {
          const res = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${storedToken}`,
            },
          });
          const data = await res.json();
          if (res.ok && data.success) {
            setUser(data.data);
          } else {
            localStorage.removeItem('authToken');
            setToken(null);
            setUser(null);
          }
        } catch (error) {
          console.error("Failed to fetch user data", error);
          localStorage.removeItem('authToken');
        }
      }
      setIsInitializing(false);
    };

    initializeAuth();
  }, []);

  const register = async (fullName: string, identity: string, password: string) => {
    setLoading(true);
    const identityType = getIdentityType(identity);
    if (identityType === 'unknown') {
      throw new Error("Định dạng email hoặc số điện thoại không hợp lệ");
    }

    const requestBody = {
      fullName,
      password,
      [identityType]: identity
    };

    try {
      const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (res.ok && data.success) {
          router.push('/dang-nhap?registered=true');
      } else {
          throw new Error(data.message || "Đăng ký thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (identity: string, password: string) => {
    setLoading(true);
    const identityType = getIdentityType(identity);
    if (identityType === 'unknown') {
      throw new Error("Định dạng email hoặc số điện thoại không hợp lệ");
    }
    
    const requestBody = {
      password,
      [identityType]: identity
    };

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setUser(data.data.user);
        setToken(data.data.token);
        localStorage.setItem('authToken', data.data.token);
        router.push('/');
      } else {
        throw new Error(data.message || "Đăng nhập thất bại");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
    router.push('/dang-nhap');
  };

  const value = {
    user,
    token,
    loading,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isInitializing && children}
    </AuthContext.Provider>
  );
};

// 4. Create the useAuth custom hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
