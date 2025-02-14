// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
