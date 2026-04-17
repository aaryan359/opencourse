import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";
import type { UserRole } from "../types";

type ProtectedRouteProps = {
  allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = Boolean(user && token);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
