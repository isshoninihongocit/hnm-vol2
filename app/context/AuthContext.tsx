"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { 
  login as backendLogin, 
  signUp as backendSignUp, 
  logout as backendLogout, 
  getCurrentUser, 
  isAuthenticated,
  User 
} from "~/utils/useAuth";

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: {
    email: string;
    password: string;
    username: string;
    college: string;
    phone: string;
  }) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing auth on mount - CLIENT SIDE ONLY
  useEffect(() => {
    const initializeAuth = () => {
      console.log('🔄 AuthContext: Initializing authentication state...');
      
      // Only run on client side
      if (typeof window !== 'undefined') {
        try {
          const currentUser = getCurrentUser();
          const authenticated = isAuthenticated();
          
          console.log('👤 AuthContext: Current user from localStorage:', currentUser);
          console.log('🔐 AuthContext: Is authenticated:', authenticated);
          
          if (currentUser && authenticated) {
            console.log('✅ AuthContext: Setting user from localStorage');
            setUser(currentUser);
          } else {
            console.log('❌ AuthContext: No valid user/token found');
          }
        } catch (error) {
          console.error('❌ AuthContext: Error during initialization:', error);
        }
      } else {
        console.log('⚠️ AuthContext: SSR - skipping localStorage check');
      }
      
      setIsLoading(false);
      console.log('✅ AuthContext: Initialization complete');
    };

    initializeAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const authResponse = await backendLogin(email, password);
      if (authResponse) {
        setUser({
          uid: authResponse.uid,
          email: email,
          username: authResponse.username,
          college: authResponse.college,
          phone: authResponse.phone,
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const signUp = async (userData: {
    email: string;
    password: string;
    username: string;
    college: string;
    phone: string;
  }): Promise<boolean> => {
    try {
      const user = await backendSignUp(userData);
      if (user) {
        setUser(user);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Signup failed:', error);
      return false;
    }
  };

  const logout = () => {
    backendLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      setUser, 
      login, 
      signUp, 
      logout, 
      isLoading 
    }}>
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
