import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserInformation } from '../common/localStorageHelper';

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  requiredRoles?: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  requiredRoles,
  children,
}) => {
  const logedUser = getUserInformation();
  if (!logedUser) {
    return <Navigate to="/sign-in" />;
  }
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (
    requiredRoles &&
    (!logedUser?.role || !requiredRoles.includes(logedUser?.role))
  ) {
    return <Navigate to="/403" />;
  }

  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
