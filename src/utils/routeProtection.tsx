import { useAuth } from "@/hooks/use-auth";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const location = useLocation();
  const { loading, isLoggedIn } = useAuth();

  const publicRoutePatterns = [/^\/login$/];

  const isPublicRoute = publicRoutePatterns.some((pattern) =>
    pattern.test(location.pathname)
  );

  if (loading) return null;
  console.log("Current path:", location.pathname);
  if (isLoggedIn && isPublicRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  if (!isLoggedIn && !isPublicRoute) {
    return <Navigate to="/login" replace />;
  }

  if (isLoggedIn && isPublicRoute) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
}
