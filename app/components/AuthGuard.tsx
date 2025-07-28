"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "@remix-run/react";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function AuthGuard({ children, redirectTo = "/login" }: AuthGuardProps) {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to login with current path as redirect parameter
      const currentPath = location.pathname + location.search;
      navigate(`${redirectTo}?redirect=${encodeURIComponent(currentPath)}`);
    }
  }, [user, isLoading, navigate, redirectTo, location]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-red-950 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  // Don't render anything if user is not authenticated (will redirect)
  if (!user) {
    return null;
  }

  // Render children if user is authenticated
  return <>{children}</>;
}
