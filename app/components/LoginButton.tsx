"use client";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "@remix-run/react";

export default function LoginButton() {
  const { user, login, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      console.log('🔐 LoginButton: Attempting login...');
      const success = await login(email, password);
      console.log('🔐 LoginButton: Login result:', success);
      
      if (success) {
        setShowLoginForm(false);
        setEmail("");
        setPassword("");
        console.log('✅ LoginButton: Login successful');
        // Optionally redirect to a specific page after login
        // navigate('/registration');
      } else {
        console.error('❌ LoginButton: Login failed');
        alert("Login failed. Please check your credentials and try again.");
      }
    } catch (error) {
      console.error('❌ LoginButton: Login error:', error);
      alert(`Login error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="flex items-center gap-4">
      {user ? (
        <>
          <span className="text-white">{user.username || user.email}</span>
          <button
            onClick={logout}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white uppercase text-xs"
          >
            Logout
          </button>
        </>
      ) : (
        <>
          {!showLoginForm ? (
            <div className="flex gap-2">
              <button
                onClick={() => setShowLoginForm(true)}
                className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white uppercase text-xs"
              >
                Quick Login
              </button>
              <button
                onClick={handleGoToLoginPage}
                className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white uppercase text-xs"
              >
                Login/Signup
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="flex gap-2 items-center">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-2 py-1 text-black rounded text-xs"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-2 py-1 text-black rounded text-xs"
                required
              />
              <button
                type="submit"
                disabled={isLoading}
                className="px-3 py-1 rounded bg-green-600 hover:bg-green-700 text-white text-xs"
              >
                {isLoading ? "..." : "Go"}
              </button>
              <button
                type="button"
                onClick={() => setShowLoginForm(false)}
                className="px-3 py-1 rounded bg-gray-600 hover:bg-gray-700 text-white text-xs"
              >
                Cancel
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
}
