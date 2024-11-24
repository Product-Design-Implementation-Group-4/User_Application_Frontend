import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe(); 
  }, []);

  

  if (!user) {
    return <Navigate to="/login" replace />; 
  }

  return children; 
};

export default ProtectedRoute;
