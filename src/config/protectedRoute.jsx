import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./authContext";
import Loader from "../components/layout/Loader/Loader";

const ProtectedRoute = () => {
  const { user, isLoading } = useAuth();
  const { pathname } = useLocation();
  localStorage.setItem("route", pathname);
  // If user is not authenticated, redirect to login
  return isLoading ? (
    <Loader />
  ) : user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
