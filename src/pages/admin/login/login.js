// import { useNavigate } from "react-router-dom";
// import { useState, useRef } from "react";
// import axios from "axios";
// import { FaRegUserCircle, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
// import "./admin-login.css";
// import {setAuthToken, getAuthToken} from "../../../services/auth";
// import linkhost from "../../..";

// export const AdminLogin = () => {
//   const navigate = useNavigate();
  
//   const [login, setLogin] = useState({
//     loading: false,
//     err: null,
//   });

//   const email = useRef('');
//   const password = useRef('');

//   const [formErrors, setFormErrors] = useState("");
  

//   const validateForm = () => {
//     let errors = "";
//     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email.current || !password.current) {
//       errors = "Both email and password are required.";
//     } else if (!emailPattern.test(email.current)) {
//       errors = "Invalid email format.";
//     }

//     setFormErrors(errors);
//     return errors === "";
//   };

//   const submit = (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     setLogin({ ...login, loading: true });

//     axios
//       .post(linkhost + "/api/Admin/login", {
//         email: email.current,
//         password: password.current
//          })
//       .then((data) => {
//         setLogin({ ...login, loading: false });
//         // Assuming backend sends user data or token
//         setAuthToken(data.data.token);
//         const {user} = getAuthToken();
//         if (user.role === "Admin") {
//           navigate("/admin/dashboard"); // Redirect to admin dashboard
//         } else {
//           setLogin({
//             ...login,
//             loading: false,
//             err: [{ msg: "Access restricted to admins only." }],
//           });
//         }
//       })
//       .catch((errors) => {
//         setLogin({
//           ...login,
//           loading: false,
//           err: [{ msg: "Invalid email or password." }],
//         });
//       });
//   };

//   const loadingSpinner = () => {
//     return (
//       <div className="container h-100">
//         <div className="row h-100 justify-content-center align-items-center">
//           <div className="spinner-border" role="status">
//             <span className="sr-only">Loading...</span>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const error = () => {
//     return (
//       <div className="container">
//         <div className="row">
//           {login.err &&
//             login.err.map((err, index) => (
//               <div
//                 key={index}
//                 className="col-sm-12 alert alert-danger"
//                 role="alert"
//               >
//                 {err.msg}
//               </div>
//             ))}
//           {formErrors && (
//             <div className="col-sm-12 alert alert-danger" role="alert">
//               {formErrors}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };


//   const LoginForm = ({ onSubmit }) => {

//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const togglePasswordVisibility = () => {
//       setPasswordVisible(!passwordVisible);
//     };
    
//     return (
//       <div className="overlay body">
//         <form onSubmit={onSubmit} className="questionGeneration">
//           <div className="f6">
//             <header>
//               <h2>Admin Login</h2>
//               <p>Log in with your admin credentials</p>
//             </header>
//             <div className="field-set">
//               <label className="small mb-1" htmlFor="email">
//                 <FaRegUserCircle /> Email address
//               </label>
//               <div className="input-item">
//                 <input
//                   className="form-input"
//                   type="email"
//                   placeholder="Email"
//                   onChange={(e) => (email.current = e.target.value)}
//                   required
//                 />
//               </div>
//               <div className="password-container">
//                 <label className="small mb-1" htmlFor="password">
//                   <FaKey /> Password
//                 </label>
//                 <div className="input-item">
//                   <input
//                     className="form-input"
//                     type={passwordVisible ? "text" : "password"}
//                     placeholder="Password"
//                     onChange={(e) => (password.current = e.target.value)}
//                     required
//                   />
//                   <span
//                     className="eye-icon"
//                     onClick={togglePasswordVisibility}
//                   >
//                     {passwordVisible ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>
//               </div>
//               <button className="log-in" type="submit">
//                 Log In
//               </button>
//             </div>
//           </div>
//         </form>
//       </div>
//     );
//   };

//       return (
//       <div className="admin-login-wrapper">
//         {login.err !== null && error()}
//         {formErrors && <div className="error-message">{formErrors}</div>}
//         {login.loading === true ? loadingSpinner() : <LoginForm onSubmit={submit} />}
//       </div>
//     );

// };

// export default AdminLogin;

import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import axios from "axios";
import { FaRegUserCircle, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import "./admin-login.css";
import { setAuthToken, getAuthToken } from "../../../services/auth";
import linkhost from "../../..";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    loading: false,
    err: null,
  });

  const email = useRef("");
  const password = useRef("");

  const [formErrors, setFormErrors] = useState("");

  const validateForm = () => {
    let errors = "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.current || !password.current) {
      errors = "Both email and password are required.";
    } else if (!emailPattern.test(email.current)) {
      errors = "Invalid email format.";
    }

    setFormErrors(errors);
    return errors === "";
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLogin({ ...login, loading: true });

    axios
      .post(linkhost + "/api/Admin/login", {
        email: email.current,
        password: password.current,
      })
      .then((data) => {
        setLogin({ ...login, loading: false });
        setAuthToken(data.data.token);
        const { user } = getAuthToken();
        if (user.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          setLogin({
            ...login,
            loading: false,
            err: [{ msg: "Access restricted to admins only." }],
          });
        }
      })
      .catch(() => {
        setLogin({
          ...login,
          loading: false,
          err: [{ msg: "Invalid email or password." }],
        });
      });
  };

  const loadingSpinner = () => {
    return (
      <div className="admin-login">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  };

  const error = () => {
    return (
      <div className="admin-login">
        <div className="login-box">
          {login.err &&
            login.err.map((err, index) => (
              <div key={index} className="alert" role="alert">
                {err.msg}
              </div>
            ))}
          {formErrors && (
            <div className="alert" role="alert">
              {formErrors}
            </div>
          )}
        </div>
      </div>
    );
  };

  const LoginForm = ({ onSubmit }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    return (
      <div className="admin-login">
        <div className="login-box">
          <form onSubmit={onSubmit}>
            <header>
              <h2>Admin Login</h2>
              <p>Log in with your admin credentials</p>
            </header>
            <div className="field-set">
              <div className="input-item">
                <label htmlFor="email">
                  <FaRegUserCircle /> Email address
                </label>
                <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  onChange={(e) => (email.current = e.target.value)}
                  required
                />
              </div>
              <div className="input-item">
                <label htmlFor="password">
                  <FaKey /> Password
                </label>
                <input
                  className="form-input"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => (password.current = e.target.value)}
                  required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              <button className="log-in" type="submit">
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      {login.err !== null && error()}
      {login.loading ? loadingSpinner() : <LoginForm onSubmit={submit} />}
    </>
  );
};

export default AdminLogin;
