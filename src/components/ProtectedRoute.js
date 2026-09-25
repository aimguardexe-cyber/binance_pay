import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  // If user is null, it's still loading the auth state
  if (user === null) {
    return <div className="flex h-screen items-center justify-center bg-canvas text-ink">Loading...</div>;
  }

  // If user is false, they are not logged in
  if (user === false) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
