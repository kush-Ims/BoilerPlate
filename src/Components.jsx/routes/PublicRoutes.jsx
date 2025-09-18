import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
 
export default function PublicRoutes({ children }) {
  const { user } = useAuth();
 
  if (user) {
    // if logged in, redirect away from public pages
    return <Navigate to="/dashboard" replace />;
  }
 
  return children; // just render the passed child (Login, ForgotPassword, etc.)
}