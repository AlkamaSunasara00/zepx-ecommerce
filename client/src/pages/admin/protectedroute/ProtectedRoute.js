import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn"); // Check login status

  return isLoggedIn ? children : <Navigate to="/admin/login" />;
};

export default ProtectedRoute;
