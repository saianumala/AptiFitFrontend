// src/routes/ProtectedRoute.tsx
import { useAuth } from "@/customHooks/useAuth";
import { JSX } from "react";
import { useLocation, Navigate } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }
  if (!isAuthenticated) {
    return <Navigate to="/landing" state={{ from: location }} replace />;
  }

  return children;
}
