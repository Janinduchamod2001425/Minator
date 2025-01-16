import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if user is authenticated

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
