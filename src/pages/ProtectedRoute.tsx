import { ReactNode, useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../store/authContext";

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    console.log("AuthContext is undefined");
    return <Navigate to="/login" />;
  }

  if (!authContext.user) {
    console.log("User is not authenticated");
    return <Navigate to="/login" />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
