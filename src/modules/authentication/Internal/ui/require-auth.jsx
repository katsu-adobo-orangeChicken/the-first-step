import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth-provider.jsx";

export default function RequireAuth() {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div
        className="flex min-h-[calc(100vh-113px)] items-center justify-center px-4 text-sm text-slate-300"
        role="status"
        aria-live="polite"
      >
        Loading your session...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/auth/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
}
