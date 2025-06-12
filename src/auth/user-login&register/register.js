import { useState, useRef } from "react";
import axios from "axios";
import { FaRegUserCircle, FaKey, FaEnvelope, FaEye, FaEyeSlash } from "react-icons/fa";
import linkhost from "../..";

const Register = ({ sigIn }) => {
    const [register, setRegister] = useState({
        loading: false,
        msg: null,
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const username = useRef('');
    const email = useRef('');
    const password = useRef('');
    const conformPassword = useRef('');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const validateForm = () => {
        let errors = "";
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (
            !email.current || 
            !password.current || 
            !username.current || 
            !conformPassword.current
        ) {
            errors = "All fields are required.";
        } else if (!emailPattern.test(email.current)) {
            errors = "Invalid Email.";
        } else if (emailPattern.test(username.current)) {
            errors = "Username should not be an email.";
        } else if (!/^[a-zA-Z0-9_]+$/.test(username.current)) {
            errors = "Username can only contain letters, numbers, and underscores.";
        } else if (!passwordPattern.test(password.current)) {
            errors = "Password must be at least 8 characters and include letters, numbers & symbols.";
        } else if (conformPassword.current !== password.current) {
            errors = "Password and Confirm Password don't match.";
        }

        setRegister({ ...register, msg: errors });
        return errors === "";
    };

    const handleRegister = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        setRegister({ ...register, loading: true });
        axios
            .post(linkhost + "/api/Auth/registeruser", {
                username: username.current,
                password: password.current,
                email: email.current,
            })
            .then((data) => {
                setRegister({ ...register, loading: false, msg: "Registered Successfully" });
                sigIn();
            })
            .catch((errors) => {
                const errorMsg = errors.response?.data || "Something went wrong. Please try again.";
                setRegister({ ...register, loading: false, msg: errorMsg });
            });
    };

    return (
        <form onSubmit={handleRegister} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            {register.msg && (
                <div className="error-message" style={{ color: register.msg === "Registered Successfully" ? "green" : "red" }}>
                    {register.msg}
                </div>
            )}
            <div className="input-field">
                <i className="fas fa-user"><FaRegUserCircle /></i>
                <input
                    type="text"
                    placeholder="Username"
                    autoComplete="new-username"
                    onChange={(e) => {
                        username.current = e.target.value;
                    }}
                    required
                />
            </div>
            <div className="input-field">
                <i className="fas fa-envelope"><FaEnvelope /></i>
                <input 
                    type="text" 
                    placeholder="Email"
                    autoComplete="new-email"
                    onChange={(e) => (email.current = e.target.value)}
                    required
                />
            </div>
            <div className="input-field">
                <i className="fas fa-lock"><FaKey /></i>
                <input 
                    type={passwordVisible ? "text" : "password"} 
                    placeholder="Password"
                    autoComplete="new-password"
                    onChange={(e) => (password.current = e.target.value)}
                    required
                />
                <span className="eye-icon" onClick={togglePasswordVisibility}>
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"><FaKey /></i>
                <input 
                    type={confirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm Password"
                    autoComplete="new-password"
                    onChange={(e) => (conformPassword.current = e.target.value)}
                    required
                />
                <span className="eye-icon" onClick={toggleConfirmPasswordVisibility}>
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <input 
                type="submit" 
                value={register.loading ? "Sign Up..." : "Sign Up"}
                disabled={register.loading}
                className="btn btn-solid"
            />
        </form>
    );
};

export default Register;
