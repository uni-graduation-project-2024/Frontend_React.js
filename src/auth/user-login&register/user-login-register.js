import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { setAuthToken } from "../../services/auth";
import axios from 'axios';
import "./user-login-register.css";
import { FaRegUserCircle, FaKey, FaEnvelope, FaEye, FaEyeSlash} from "react-icons/fa"; 
import loginImage from "../../assets/login.png";
import registerImage from "../../assets/register.png";
import linkhost from "../..";

const LoginRegisterUser = () => {
    const [mode, setMode] = useState("container");

    const handleSignUpMode = () => {
        setMode("container sign-up-mode");
    };
    const handleSignInMode = ()=>{
        setMode("container");
    };

    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const navigate = useNavigate();
    const username = useRef('');
    const email = useRef('');
    const password = useRef('');

    const handleLogin = (e) => {
        e.preventDefault();
        axios
          .post(linkhost + "/api/Auth/login", {
            email: email.current,
            password: password.current,
            })
          .then((data) => {
            setAuthToken(data.data.token);
            navigate("/GenerationForm");
            // Handle successful login (e.g., navigate based on user role)
          })
          .catch((errors) => {

          });
    };
    const handleRegister = (e) => {
        e.preventDefault();
        axios
          .post(linkhost + "/api/Auth/registeruser", {
            username: username.current,
            password: password.current,
            email: email.current,
            })
          .then((data) => {
            handleSignInMode();
            // Handle successful login (e.g., navigate based on user role)
          })
          .catch((errors) => {

          });
    };

    return (
        <div className="loginRegister">
        <div className={mode}>
        <div className="forms-container">
            <div className="signin-signup">
                <form onSubmit={handleLogin} className="sign-in-form">
                    <h2 className="title">Sign in</h2>
                    <div className="input-field">
                        <i className="fas fa-user"><FaRegUserCircle /></i>
                        <input 
                        type="text" 
                        placeholder="Username"
                        onChange={(e) => (email.current = e.target.value)}
                        required 
                        />
                    </div>
                    
                    <div className="input-field">
                        <i className="fas fa-lock"><FaKey /></i>
                        <input 
                        type={passwordVisible ? "text" : "password"} 
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
                        <input type="submit" value="LOGIN" className="btn btn-solid"/>
                    
                </form>
                <form onSubmit={handleRegister} className="sign-up-form">
                    <h2 className="title">Sign up</h2>
                    <div className="input-field">
                        <i className="fas fa-user"><FaRegUserCircle /></i>
                        <input 
                        type="text" 
                        placeholder="Username"
                        onChange={(e) => (username.current = e.target.value)}
                        required
                        />
                    </div>
                    <div className="input-field">
                        <i className="fas fa-envelope"><FaEnvelope/></i>
                        <input 
                        type="text" 
                        placeholder="Email"
                        onChange={(e) => (email.current = e.target.value)}
                        required
                        />
                    </div>
                    
                    <div className="input-field">
                        <i className="fas fa-lock"><FaKey /></i>
                        <input 
                        type={passwordVisible ? "text" : "password"} 
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
                        type={passwordVisible ? "text" : "password"} 
                        placeholder="Confirm Password"
                        required
                        />
                        <span 
                            className="eye-icon" 
                            onClick={togglePasswordVisibility}
                        >
                            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                        </span>
                    </div>
                        <input type="submit" value="Sign Up" className="btn btn-solid"/>

                    
                </form>
            </div>
        </div>
        <div className="panels-container">
            <div className="panel left-panel">
                <div className="content">
                    <h3>Welcome To Learntendo</h3>
                    <p>If you don't have an account</p>
                    <button onClick={handleSignUpMode} className="btn transperant" id="sign-up-btn">Sign up</button>
                </div>

                <img src={loginImage} className="image" alt=""/>
            </div>
            <div className="panel right-panel">
                <div className="content">
                    <h3>Welcome To Learntendo</h3>
                    <p>If you have an account</p>
                    <button onClick={handleSignInMode} className="btn transparent" id="sign-in-btn">Sign in</button>
                </div>

                <img src={registerImage} className="image" alt=""/>
            </div>
        </div>
        </div>
        </div>
    );
};

export default LoginRegisterUser;