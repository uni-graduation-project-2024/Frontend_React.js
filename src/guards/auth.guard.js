import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../services/auth";

export const AuthGuard = ({ roles }) => {
  const { token, user } = getAuthToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to={`/${user.role.toLowerCase()}-dashboard`} />;
  }

  return <Outlet />;
};
