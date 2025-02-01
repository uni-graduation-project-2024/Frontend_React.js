import { Navigate } from "react-router-dom";

const AuthGuard = ({ roles, children }) => {
  const user = JSON.parse(localStorage.getItem("user")); // Or use context/session for auth state

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthGuard;
