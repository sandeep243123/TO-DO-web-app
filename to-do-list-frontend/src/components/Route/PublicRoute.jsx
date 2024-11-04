import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, children }) => {
  // If the user is authenticated, redirect to home
  if (isAuthenticated) {
    return <Navigate to="/home" replace />;
  }
  // Otherwise, render the children (login/signup)
  return children;
};

export default PublicRoute;