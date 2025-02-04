import { FaRegUserCircle, FaKey, FaUserPlus, FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

export const Register = () => {
  const navigate = useNavigate();

  const [register, setRegister] = useState({
    loading: false,
    result: {},
    err: null,
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const form = useRef({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });

  const submit = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true });

    // Form validation
    if (
      !form.current.email.value ||
      !form.current.password.value ||
      !form.current.confirmPassword.value ||
      !form.current.username.value
    ) {
      setRegister({
        ...register,
        loading: false,
        err: [{ msg: "All fields are required." }],
      });
      return;
    }

    // Email validation regex (basic check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.current.email.value)) {
      setRegister({
        ...register,
        loading: false,
        err: [{ msg: "Invalid email format." }],
      });
      return;
    }

    // Password match validation
    if (form.current.password.value !== form.current.confirmPassword.value) {
      setRegister({
        ...register,
        loading: false,
        err: [{ msg: "Passwords do not match." }],
      });
      return;
    }

    axios
      .post("https://localhost:7078/api/Auth/registeruser", {
        email: form.current.email.value,
        password: form.current.password.value,
        username: form.current.username.value,
      })
      .then(() => {
        setRegister({ ...register, loading: false });
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data) {
          const errorMessage =
            error.response.data.message || "Something went wrong";
          setRegister({
            ...register,
            loading: false,
            err: [{ msg: errorMessage }],
          });
        } else {
          setRegister({
            ...register,
            loading: false,
            err: [{ msg: "Server error. Please try again later." }],
          });
        }
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
          {register.err &&
            register.err.map((err, index) => {
              return (
                <div
                  key={index}
                  className="col-sm-12 alert alert-danger"
                  role="alert"
                >
                  {err.msg}
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible); // Toggle confirm password visibility
  };

  return (
    <div className="fr">
      {register.err !== null && error()}
      {register.loading === true ? (
        loadingSpinner()
      ) : (
        <form onSubmit={submit}>
          <header>
            <h2>Register</h2>
            <p>Fill in your details to create an account</p>
          </header>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="email">
              <FaRegUserCircle /> Email address
            </label>
            <input
              className="form-control"
              type="email"
              id="email"
              placeholder="Enter Email"
              ref={(val) => {
                form.current.email = val;
              }}
              required
            />
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="password">
              <FaKey /> Password
            </label>
            <div className="input-group password-container">
              <input
                className="form-control"
                type={passwordVisible ? "text" : "password"} // Toggle input type
                id="password"
                placeholder="Enter Password"
                ref={(val) => {
                  form.current.password = val;
                }}
                required
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="confirmPassword">
              <FaKey /> Confirm Password
            </label>
            <div className="input-group password-container">
              <input
                className="form-control"
                type={confirmPasswordVisible ? "text" : "password"} // Toggle input type
                id="confirmPassword"
                placeholder="Confirm Password"
                ref={(val) => {
                  form.current.confirmPassword = val;
                }}
                required
              />
              <span
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>
          <div className="mb-3">
            <label className="small mb-1" htmlFor="username">
              <FaUserPlus /> Username
            </label>
            <input
              className="form-control"
              type="text"
              id="username"
              placeholder="Enter Username"
              ref={(val) => {
                form.current.username = val;
              }}
              required
            />
          </div>
          <button className="register-btn" type="submit">
            Register <FaUserPlus />
          </button>
        </form>
      )}
    </div>
  );
};

export default Register;
