import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface AdminRouteProps {
  children: React.ReactElement;
}

export const AdminRoute = ({ children }: AdminRouteProps) => {
  const { status, user } = useAuth();
  const location = useLocation();

  if (status === "loading" || status === "idle") {
    return null;
  }

  if (status !== "authenticated" || !user?.isAdmin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

