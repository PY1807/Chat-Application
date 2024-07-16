import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // If the user is not logged in, do not render children
  if (!isLoggedIn) {
    return null;
  }

  // Render children if the user is logged in
  return children;
};

export default ProtectedRoute;
