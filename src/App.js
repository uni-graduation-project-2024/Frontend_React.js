import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "./guards/auth.guard";
import Home from "./pages/Home/Home";

import LoginRegisterUser from "./auth/user-login&register/user-login-register";
import ChangePassword from "./auth/user-changePassword/changePassword";


import AdminLogin from "./pages/admin/login/login";
import Dashboard  from "./pages/admin/dashboard";
import ShowUser from "./pages/admin/show-users/show-user";

import MainLayout from "./Layouts/MainLayout/MainLayout";
import Library from "./pages/Library/Library";
import GenerationForm from "./pages/QuestionGenerator/GenerationForm";
import PracticeMode from "./pages/QuestionGenerator/PracticeMode";
import Leaderboard from "./pages/Leaderboard/Leaderboard";
import FolderView from "./pages/Library/FolderView";
import ScorePage from "./pages/QuestionGenerator/scorePage";
import ReviewMode from "./pages/Library/ReviewMode"; 
import Challenge from "./pages/Challenges/Challenge";
import UserProfile from "./pages/UserProfile/UserProfile";
import Market from "./pages/Market/Market";
import Badge from "./pages/Badges/Badge";
import UserUploads from "./pages/Library/UserUploads/UserUploads";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />

          {/* Guest routes */}
          <Route element={<AuthGuard roles={[]} />}>
          <Route path="/loginRegister" element={<LoginRegisterUser/>}/>
          <Route path="/admin/login" element={<AdminLogin />} />
           </Route>
          
          {/* User-protected routes */}
          
          <Route element={<AuthGuard roles={["User"]}/>}>
            <Route path="/PracticeMode" element={<PracticeMode/>}/>
            <Route path="/score" element={<ScorePage />} />

            <Route element={<MainLayout/>}>
              <Route path="/library" element={<Library />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/GenerationForm" element={<GenerationForm />} />
              <Route path="/challenges" element={<Challenge />} /> 
              <Route path="/market" element={<Market />} /> 
              <Route path="/user-profile/:userId" element={<UserProfile />} />
              <Route path="/badge" element={<Badge />} /> 

              <Route path="/folder/:folderName" element={<FolderView />} />
              <Route path="/Review-Mode" element={<ReviewMode />} /> 
              <Route path="/my-uploads" element={<UserUploads />} /> 

              
           </Route>
          </Route>



          {/* Admin-protected routes */}
          <Route element={<AuthGuard roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/show-user/:id" element={<ShowUser />} />
            <Route path="/user-profile/:userId" element={<UserProfile />} />
          </Route>

          <Route element={<AuthGuard roles={["User", "Admin"]} />}>
            <Route path="/change-password" element={<ChangePassword />} />
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
