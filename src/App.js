import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import AuthGuard from "./guards/auth.guard";
import Home from "./pages/Home/home";

import LoginRegisterUser from "./auth/user-login&register/user-login-register";
import ChangePassword from "./auth/user-changePassword/changePassword";
import Library from "./pages/Library/library";
import CreateFolder from "./pages/Library/CreateFolder";
import QuestionGenerator from "./pages/QuestionGenerator/QuestionGenerator";

import AdminLogin from "./pages/admin/login/login";
import Dashboard  from "./pages/admin/dashboard";
import ShowUser from "./pages/admin/show-users/show-user";

import QuestionAnswers from "./pages/QuestionGenerator/QuestionAnswers";
import Leaderboard from "./pages/Leaderboard";
import FolderView from "./pages/Library/folderView";
import ScorePage from "./pages/QuestionGenerator/scorePage";
import MoveExam from "./pages/Library/MoveToFolder";
import ViewQuestions from "./pages/Library/ViewQuestions";

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

            {/* All the below routes must not be in this block it is here for front testing only*/}
            {/* <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/library" element={<Library />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/generate-questions" element={<QuestionGenerator />} />
            <Route path="/create-folder" element={<CreateFolder />} />
            <Route path="/Question-Answers" element={<QuestionAnswers/>}/>
            <Route path="/folder/:folderName" element={<FolderView />} />
            <Route path="/score" element={<ScorePage />} />
            <Route path="/move-exam" element={<MoveExam />} />
            <Route path="/view-questions" element={<ViewQuestions />} />
            <Route path="/move-exam" element={<MoveExam />} />   */}
            {/* All the above routes must not be in this block it is here for front testing only*/}
          </Route>
          
          {/* User-protected routes */}
          <Route element={<AuthGuard roles={["User"]} />}>
            <Route path="/library" element={<Library />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/generate-questions" element={<QuestionGenerator />} />
            <Route path="/create-folder" element={<CreateFolder />} />
            <Route path="/Question-Answers" element={<QuestionAnswers/>}/>
            <Route path="/folder/:folderName" element={<FolderView />} />
            <Route path="/score" element={<ScorePage />} />
            <Route path="/move-exam" element={<MoveExam />} />
            <Route path="/view-questions" element={<ViewQuestions />} />
            <Route path="/move-exam" element={<MoveExam />} />
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
