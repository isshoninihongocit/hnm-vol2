"use client";

import { createContext, useContext, useState } from "react";
import { signInWithGoogle, logout as firebaseLogout } from "~/utils/useAuth";

type User = {
  uid: string;
  name: string | null;
  email: string | null;
  photoURL: string | null;
  college?: string | null;
  phone?: string | null;
} | null;

type AuthContextType = {
  setUser?: (user: User | null) => void;
  user: User;
  login: () => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User>(null);

  const login = async () => {
    const userData = await signInWithGoogle();
    setUser(userData);
  };
  // You can add useEffect here to check auth state on mount if needed
  const logout = async () => {
    await firebaseLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout,setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
