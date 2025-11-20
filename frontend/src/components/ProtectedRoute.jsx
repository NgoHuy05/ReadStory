import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken, isAuthLoading } = useSelector((s) => s.auth);

  if (isAuthLoading) return null;

  if (!accessToken) return <Navigate to="/sign-in" replace />;

  return <Outlet />;
};

export default ProtectedRoute;
