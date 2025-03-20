import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaRegUserCircle, FaKey, FaEye, FaEyeSlash} from "react-icons/fa";

import linkhost from "../..";
import { setAuthToken } from "../../services/auth";


const Login = () => {
	const navigate = useNavigate();
	const [login, setLogin] = useState({
		loading: false,
		err: null,
	});
	const [passwordVisible, setPasswordVisible] = useState(false);
	const email = useRef('');
	const password = useRef('');

	const togglePasswordVisibility = () => {
		setPasswordVisible(!passwordVisible);
	};

	const validateForm = () => {
		let errors = "";
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!email || !password) {
			errors = "Both email and password are required.";
		} else if (!emailPattern.test(email.current)) {
			errors = "Invalid Email";
		}

		setLogin({...login, err: errors});
		return errors === ""; 
	};

	const handleLogin = (e) => {
		e.preventDefault();
		if (!validateForm()) return; 

		setLogin({ ...login, loading: true });
		axios
			.post(linkhost + "/api/Auth/login", {
			email: email.current,
			password: password.current,
			})
			.then((data) => {
			setAuthToken(data.data.token);
			navigate("/GenerationForm");
			})
			.catch((errors) => {
			setLogin({ ...login, loading: false, err: "Invalid email or password"});
			});
	};

	return (
	<form onSubmit={handleLogin} className="sign-in-form">
		<h2 className="title">Sign in</h2>
		{login.err !== null && <div className="error-message">{login.err}</div>}
		<div className="input-field">
			<i className="fas fa-user"><FaRegUserCircle /></i>
			<input 
			className="input-input-field"
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
			<input type="submit" 
			value={ login.loading? "LOGIN...": "LOGIN"}
			disabled= { login.loading? true: false}
			className="btn btn-solid"/>
		
	</form>
	);

};

export default Login;