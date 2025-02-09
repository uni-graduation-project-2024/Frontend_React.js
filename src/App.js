import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/admin/login/login";
import { ShowUser } from "./pages/admin/show-users/show-user";
import { UpdateUser } from "./pages/admin/update-users/update-user";
import AuthGuard from "./guards/auth.guard";
import ChangePassword from "./auth/user-changePassword/changePassword";
import Library from "./pages/Library/library";
import Home from "./pages/Home/home";
import CreateFolder from "./pages/Library/CreateFolder";
import QuestionGenerator from "./pages/QuestionGenerator/QuestionGenerator";
import LoginRegisterUser from "./auth/user-login&register/user-login-register";
import { Dashboard } from "./pages/admin/dashboard";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          <Route element={<AuthGuard roles={[]} />}>
          <Route path="/loginRegister" element={<LoginRegisterUser/>}/>
          <Route path="/admin/login" element={<AdminLogin />} />
          </Route>
          
          {/* User-protected routes */}
          <Route element={<AuthGuard roles={["User"]} />}>
          <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/library" element={<Library />} />
            <Route path="/generate-questions" element={<QuestionGenerator />} />
            <Route path="/create-folder" element={<CreateFolder />} />
          </Route>

          {/* Admin-protected routes */}
          <Route element={<AuthGuard roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/show-user/:id" element={<ShowUser />} />
            <Route path="/admin/update-user/:id" element={<UpdateUser />} />
          </Route>

          {/* Unauthorized Route */}
          <Route path="/unauthorized" element={<h1>Unauthorized Access</h1>} />

          {/* Redirect for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
