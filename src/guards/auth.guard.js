// import { Navigate, Outlet } from "react-router-dom";
// import { getAuthToken } from "../services/auth";

// const AuthGuard = ({ roles }) => {
//   const { token, user } = getAuthToken();
//   if (!token) {
//     return <> {roles.length === 0 ? <Outlet /> : <Navigate to={"/login"} />} </>;
//   } else {
//     return <> {roles.find((role) => user.role.includes(role)) ? <Outlet /> : <Navigate to={`${user.role.toLowerCase()}-home`} />} </>;
//   }
// };

// export default AuthGuard;


import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "../services/auth";

const AuthGuard = ({ roles = [] }) => {
  const auth = getAuthToken(); // safely handle token decoding
  const token = auth?.token;
  const user = auth?.user;

  // No token or user => Not authenticated
  if (!token || !user) {
    // Public route allowed if roles is empty
    return roles.length === 0 ? <Outlet /> : <Navigate to="/login" />;
  }

  // If role is allowed, proceed
  const hasPermission = roles.length === 0 || roles.includes(user.role);
  return hasPermission
    ? <Outlet />
    : <Navigate to={`/${user.role.toLowerCase()}-home`} />;
};

export default AuthGuard;
