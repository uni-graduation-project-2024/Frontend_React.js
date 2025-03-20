import { useState, useRef } from "react";
import axios from "axios";
import { FaRegUserCircle, FaKey, FaEnvelope, FaEye, FaEyeSlash} from "react-icons/fa";

import linkhost from "../..";

const Register = ({sigIn}) => {
    const [register, setRegister] = useState({
        loading: false,
        msg: null,
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };
    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(!confirmPasswordVisible);
    };

    const username = useRef('');
    const email = useRef('');
    const password = useRef('');
    const conformPassword = useRef('');

    const validateForm = () => {
        let errors = "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!email || !password) {
            errors = "Both email and password are required.";
        } else if (!emailPattern.test(email.current)) {
            errors = "Invalid Email.";
        }else if(conformPassword.current !== password.current){
            errors = "Password and Confirm Password doesn't match"
        }
    
        setRegister({...register, msg: errors});
        return errors === ""; 
      };


    const handleRegister = (e) => {
        e.preventDefault();
        if (!validateForm()) return; 

        axios
          .post(linkhost + "/api/Auth/registeruser", {
            username: username.current,
            password: password.current,
            email: email.current,
            })
          .then((data) => {
            setRegister({ ...register, loading: false, msg: "Registered Successfully"});
            sigIn();
          })
          .catch((errors) => {
            const errorMsg = errors.response.data || "Something went wrong. Please try again.";
            setRegister({ ...register, loading: false, msg: errorMsg });
          });
    };

    return (
        <form onSubmit={handleRegister} className="sign-up-form">
            <h2 className="title">Sign up</h2>
            {register.msg !== null && <div className="error-message" 
            style={register.msg === "Registered Successfully"? {color: "green"}: {color: "red"}}>{register.msg}</div>}
            <div className="input-field">
                <i className="fas fa-user"><FaRegUserCircle /></i>
                <input 
                type="text" 
                className="input-input-field"
                placeholder="Username"
                onChange={(e) => (username.current = e.target.value)}
                required
                />
            </div>
            <div className="input-field">
                <i className="fas fa-envelope"><FaEnvelope/></i>
                <input 
                type="text" 
                className="input-input-field"
                placeholder="Email"
                onChange={(e) => (email.current = e.target.value)}
                required
                />
            </div>
            
            <div className="input-field">
                <i className="fas fa-lock"><FaKey /></i>
                <input 
                type={passwordVisible ? "text" : "password"} 
                className="input-input-field"
                placeholder="Password"
                onChange={(e) => (password.current = e.target.value)}
                required
                />
                <span 
                    className="eye-icon" 
                    onClick={togglePasswordVisibility}
                >
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
            <div className="input-field">
                <i className="fas fa-lock"><FaKey /></i>
                <input 
                type={confirmPasswordVisible ? "text" : "password"}
                className="input-input-field" 
                placeholder="Confirm Password"
                onChange={(e) => (conformPassword.current = e.target.value)}
                required
                />
                <span 
                    className="eye-icon" 
                    onClick={toggleConfirmPasswordVisibility}
                >
                    {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </span>
            </div>
                <input type="submit" 
                value={ register.loading? "Sign Up...":"Sign Up"}
                disabled={register.loading? true: false}
                className="btn btn-solid"/>

            
        </form>
    );
};

export default Register;