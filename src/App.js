import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "./guards/auth.guard";
import Home from "./pages/Home/home";

import LoginRegisterUser from "./auth/user-login&register/user-login-register";
import ChangePassword from "./auth/user-changePassword/changePassword";
import Library from "./pages/Library/library";
import CreateFolder from "./pages/Library/CreateFolder";
import GenerationForm from "./pages/QuestionGenerator/GenerationForm";

import AdminLogin from "./pages/admin/login/login";
import Dashboard  from "./pages/admin/dashboard";
import ShowUser from "./pages/admin/show-users/show-user";

import Layout from "./pages/Layout";
import PracticeMode from "./pages/QuestionGenerator/PracticeMode";
import Leaderboard from "./pages/Leaderboard";
import FolderView from "./pages/Library/folderView";
import ScorePage from "./pages/QuestionGenerator/scorePage";
import MoveExam from "./pages/Library/MoveToFolder";
import ReviewMode from "./pages/Library/ReviewMode"; 
import Challenge from "./pages/challenges/Challenge";
import UserProfile from "./pages/user-profile/userProfile";
import Market from "./pages/market/market";

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
            <Route path="/create-folder" element={<CreateFolder />} />
            <Route path="/move-exam" element={<MoveExam />} />

            <Route element={<Layout/>}>
              <Route path="/library" element={<Library />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/GenerationForm" element={<GenerationForm />} />
              <Route path="/challenges" element={<Challenge />} /> 
              <Route path="/market" element={<Market />} /> 
              <Route path="/user-profile" element={<UserProfile />} /> 

              <Route path="/folder/:folderName" element={<FolderView />} />
              <Route path="/Review-Mode" element={<ReviewMode />} /> 
              
            </Route>

           </Route>


          {/* Admin-protected routes */}
          <Route element={<AuthGuard roles={["Admin"]} />}>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/show-user/:id" element={<ShowUser />} />
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
