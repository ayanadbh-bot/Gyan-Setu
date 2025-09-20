
import React from 'react';
// Fix: Corrected import statement for react-router-dom.
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../types';

interface ProtectedRouteProps {
  children: JSX.Element;
  roles: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, roles }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!roles.includes(user.role)) {
    // Redirect to their own dashboard if they try to access a wrong role page
    const dashboardPath = user.role === UserRole.Educator ? '/educator/dashboard' : '/student/dashboard';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute;