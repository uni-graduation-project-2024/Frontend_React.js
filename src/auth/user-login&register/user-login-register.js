import {  useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./user-login-register.css";
import loginImage from "../../assets/images/login.png";
import registerImage from "../../assets/images/register.png";
import Login from "./login";
import Register from "./register";

const LoginRegisterUser = () => {
    const [mode, setMode] = useState("container");

    const location = useLocation();
    const toMode = location.state?.toMode || {};

    useEffect(()=>{
        if(toMode == "signUp")
            setMode("container sign-up-mode");
    }, []);

    const handleSignUpMode = () => {
        setMode("container sign-up-mode");
    };
    const handleSignInMode = ()=>{
        setMode("container");
    };

    return (
        <div className="loginRegister">
        <div className={mode}>
        <div className="forms-container">
            <div className="signin-signup">
                <Login/>
                <Register sigIn={handleSignInMode}/>
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