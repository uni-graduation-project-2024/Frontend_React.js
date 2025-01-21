// import React from "react";
// import { createBrowserRouter, Navigate } from "react-router-dom";
// import Login from "./auth/user-login/login";
// import { Register } from "./auth/user-register/register";
// import { AuthGuard } from "./guards/auth.guard";
// import  App  from "./App";

// export const routes = createBrowserRouter([
//   {
//     path: "/", // localhost:3000
//     element: <App />,
//     children: [
//       {
//         element: <AuthGuard roles={[]} />, // AuthGuard wraps protected routes
//         children: [
//           {
//             path: "login",
//             element: <Login />,
//           },
//           {
//             path: "register",
//             element: <Register />,
//           },
//         ],
//       },
//       {
//         path: "*", // Catch-all route for invalid paths
//         element: <Navigate to="/" />,
//       },
//     ],
//   },
// ]);

// export default routes;
