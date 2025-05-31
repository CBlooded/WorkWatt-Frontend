import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute: React.FC<React.PropsWithChildren<object>> = ({
  children,
}) => {
  const token = sessionStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return <>{children ? children : <Outlet />}</>;
};

export default ProtectedRoute;
