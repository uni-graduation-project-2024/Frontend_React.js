// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Login from "./auth/user-login/login";
// import Register from "./auth/user-register/register";
// import AdminLogin from "./pages/admin/login/login";
// import { ShowUser } from "./pages/admin/show-users/show-user";
// import { UpdateUser } from "./pages/admin/update-users/update-user";
// import  AuthGuard  from "./guards/auth.guard";
// import ChangePassword from "./auth/changePassword";
// import Library from "./pages/Library/library";
// import Home from "./pages/Home/home";
// import CreateFolder from "./pages/Library/CreateFolder";
// import QuestionGenerator from "./pages/QuestionGenerator/QuestionGenerator";


// function App() {
//   return (
//     <Router>
//       <div className="App">
//         <Routes>
//           {/* Public routes */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/change-password" element={<ChangePassword />} />
//           <Route path="/admin/login" element={<AdminLogin />} />
//           <Route path="/create-folder" element={<CreateFolder />} /> {/* Add this route */}
//           <Route path="/" element={<Home />} /> {/* Home page */}
//           <Route path="/generate-questions" element={<QuestionGenerator />} />
//             <Route path="/library" element={<Library />} /> {/* My Library */}

//           {/* User-protected routes */}
//           <Route element={<AuthGuard roles={["User"]} />}>
//             <Route path="/" element={<Home />} /> {/* Home page */}
//             <Route path="/library" element={<Library />} /> {/* My Library */}
//           </Route>

//           {/* Admin-protected routes */}
//           <Route path="/admin" element={<AuthGuard roles={["Admin"]} />}>
//             <Route path="dashboard" element={<ShowUser />} />
//             <Route path="update-user/:id" element={<UpdateUser />} />
//           </Route>

//           {/* Redirect for unknown routes */}
//           <Route path="*" element={<Navigate to="/" replace />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./auth/user-login/login";
import Register from "./auth/user-register/register";
import AdminLogin from "./pages/admin/login/login";
import { ShowUser } from "./pages/admin/show-users/show-user";
import { UpdateUser } from "./pages/admin/update-users/update-user";
import AuthGuard from "./guards/auth.guard";
import ChangePassword from "./auth/user-changePassword/changePassword";
import Library from "./pages/Library/library";
import Home from "./pages/Home/home";
import CreateFolder from "./pages/Library/CreateFolder";
import QuestionGenerator from "./pages/QuestionGenerator/QuestionGenerator";
import { Dashboard } from "./pages/admin/dashboard";

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
          <Route path="/create-folder" element={<CreateFolder />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/show-user/:id" element={<ShowUser />} />


          <Route path="/" element={<Home />} />
          <Route path="/generate-questions" element={<QuestionGenerator />} />
          <Route path="/library" element={<Library />} />

          {/* User-protected routes */}
          <Route element={<AuthGuard roles={["User"]} />}>
            <Route path="/library" element={<Library />} />
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
