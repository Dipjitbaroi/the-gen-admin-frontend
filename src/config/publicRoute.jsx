import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./authContext";
import Loader from "../components/layout/Loader/Loader";

const PublicRoute = () => {
  const { user, isLoading } = useAuth();
  const route = localStorage.getItem("route");
  return isLoading ? (
    <Loader />
  ) : user ? (
    <Navigate to={route ? route : "/dashboard"} replace />
  ) : (
    <Outlet />
  );
};

export default PublicRoute;
