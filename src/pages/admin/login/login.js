import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { FaRegUserCircle, FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import "./login.css";

export const AdminLogin = () => {
  const navigate = useNavigate();

  const [login, setLogin] = useState({
    loading: false,
    err: null,
  });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLogin({ ...login, loading: true });

    axios
      .post("https://localhost:7163/Auth/adminlogin", { email, password })
      .then((data) => {
        setLogin({ ...login, loading: false });
        // Assuming backend sends user data or token
        const userData = data.data;
        if (userData.role === "admin") {
          navigate("/admin/dashboard"); // Redirect to admin dashboard
        } else {
          setLogin({
            ...login,
            loading: false,
            err: [{ msg: "Access restricted to admins only." }],
          });
        }
      })
      .catch((errors) => {
        setLogin({
          ...login,
          loading: false,
          err: [{ msg: "Invalid email or password." }],
        });
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
          {login.err &&
            login.err.map((err, index) => (
              <div
                key={index}
                className="col-sm-12 alert alert-danger"
                role="alert"
              >
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
    return (
      <div className="overlay">
        <form onSubmit={onSubmit}>
          <div className="f6">
            <header>
              <h2>Admin Login</h2>
              <p>Log in with your admin credentials</p>
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
              <button className="log-in" type="submit">
                Log In
              </button>
            </div>
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

export default AdminLogin;
