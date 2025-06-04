import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div className="text-white p-4">Checking permissions...</div>;
  }

  if (!user.isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
}
