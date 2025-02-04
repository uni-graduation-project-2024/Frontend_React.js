// import { Navigate } from "react-router-dom";

// const AuthGuard = ({ roles, children }) => {
//   const user = JSON.parse(localStorage.getItem("user")); // Or use context/session for auth state

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

// export default AuthGuard;
import { Navigate, Outlet } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthGuard = ({ roles }) => {
  const token = localStorage.getItem("token"); // Retrieve token

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const user = jwtDecode(token);

    if (!user || !user.role) {
      return <Navigate to="/login" replace />;
    }

    if (!roles.includes(user.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />; // Render protected routes
  } catch (error) {
    console.error("Invalid token", error);
    return <Navigate to="/login" replace />;
  }
};

export default AuthGuard;
