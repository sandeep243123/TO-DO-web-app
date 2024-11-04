import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    // If the user is authenticated, redirect them to the home page
    return <Navigate to="/home" replace />;
  }
  return children; // If not authenticated, render the child component
};

export default PublicRoute;