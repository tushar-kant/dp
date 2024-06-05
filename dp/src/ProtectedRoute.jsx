import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './components/auth/AuthContext.jsx';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return isLoggedIn ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
