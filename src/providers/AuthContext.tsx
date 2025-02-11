import React, { createContext, useEffect, useState } from "react";
import { AuthState, User } from "../types/auth";

interface AuthContextType extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  getSessionInfo: () => { loginTime: string; expiresAt: string } | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth
      ? JSON.parse(savedAuth)
      : { user: null, isAuthenticated: false };
  });

  useEffect(() => {
    if (auth.isAuthenticated) {
      localStorage.setItem("auth", JSON.stringify(auth));
      localStorage.setItem("loginTime", new Date().toISOString());
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);
      localStorage.setItem("expiresAt", expiresAt.toISOString());
    }
  }, [auth]);

  const login = (user: User) => {
    setAuth({ user, isAuthenticated: true });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("loginTime");
    localStorage.removeItem("expiresAt");
    setAuth({ user: null, isAuthenticated: false });
  };

  const getSessionInfo = () => {
    const loginTime = localStorage.getItem("loginTime");
    const expiresAt = localStorage.getItem("expiresAt");

    if (!loginTime || !expiresAt) return null;

    return {
      loginTime,
      expiresAt,
    };
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, getSessionInfo }}>
      {children}
    </AuthContext.Provider>
  );
}
