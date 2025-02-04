import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import axios from 'axios';
import { FaRegUserCircle, FaKey, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa"; 
import "./login.css";
import {setAuthToken} from "../../services/auth"

export const Login = () => {
  const navigate = useNavigate(); 
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const [login, setLogin] = useState({
    loading: false,
    err: null,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const form = useRef({
    email: "",
    password: "",
  });

  const validateForm = () => {
    let errors = "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email || !password) {
      errors = "Both email and password are required.";
    } else if (!emailPattern.test(email)) {
      errors = "Invalid email format.";
    }

    setFormErrors(errors);
    return errors === ""; 
  };

  const submit = (formData) => {
    if (!validateForm()) return; 
    
    setLogin({ ...login, loading: true });
    axios
      .post("https://localhost:7078/api/Auth/login", formData)
      .then((data) => {
        setLogin({ ...login, loading: false });
        setAuthToken(data.data.token);
        navigate("/home");
        // Handle successful login (e.g., navigate based on user role)
      })
      .catch((errors) => {
        setLogin({ ...login, loading: false, err: [{ msg: `Invalid email or password` }] });
      });
  };

  const loadingSpinner = () => {
    return (
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  };

  const error = () => {
    return (
      <div className="container">
        <div className="row">
          {login.err && login.err.map((err, index) => (
            <div key={index} className="col-sm-12 alert alert-danger" role="alert">
              {err.msg}
            </div>
          ))}
          {formErrors && (
            <div className="col-sm-12 alert alert-danger" role="alert">
              {formErrors}
            </div>
          )}
        </div>
      </div>
    );
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const LoginForm = ({ onSubmit }) => {
    const handleSubmit = (e) => {
      e.preventDefault();
      onSubmit({ email, password });
    };

    return (
      <div className="overlay">
        <form onSubmit={handleSubmit}>
          <div className="f6">
            <header>
              <h2>Log In</h2>
              <p>Login here using your email and password</p>
            </header>
            <div className="field-set">
            <label className="small mb-1" htmlFor="email">
              <FaRegUserCircle /> Email address
            </label> 
              <div className="input-item">             
              <input
                  className="form-input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="password-container">
              <label className="small mb-1" htmlFor="password">
              <FaKey /> Password
            </label>
                <div className="input-item">
                  <input
                    className="form-input"
                    type={passwordVisible ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <span 
                    className="eye-icon" 
                    onClick={togglePasswordVisibility}
                  >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
              <button className="log-in" type="submit">Log In</button>
            </div>
            <button onClick={handleRegisterClick} className="sign-up-btn">
              Sign Up <FaUserPlus />
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <>
      {login.err !== null && error()}
      {formErrors && <div className="error-message">{formErrors}</div>}
      {login.loading === true ? (
        loadingSpinner()
      ) : (
        <LoginForm onSubmit={submit} />
      )}
    </>
  );
};

export default Login;
