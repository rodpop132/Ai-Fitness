import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { status } = useAuth();
  const location = useLocation();

  if (status === "loading" || status === "idle") {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-muted-foreground">
        A carregar sessão...
      </div>
    );
  }

  if (status !== "authenticated") {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};
