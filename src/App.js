import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/user-login/login";
import Register from "./auth/user-register/register";
import AdminLogin from "./pages/admin/login/login";
import { ShowUser } from "./pages/admin/show-users/show-user";
import { UpdateUser } from "./pages/admin/update-users/update-user";
import { AuthGuard } from "./guards/auth.guard";
import ChangePassword from "./auth/changePassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          <Route element={<AuthGuard roles={["User"]} />}>
            {/* Add user-specific routes here */}
          </Route>

          {/* Admin-specific protected routes */}
          <Route element={<AuthGuard roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<ShowUser />} />
            <Route path="/admin/update-user/:id" element={<UpdateUser />} />
          </Route>

          {/* Redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
