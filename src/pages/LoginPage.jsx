import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    FaGoogle,
    FaFacebookF,
    FaApple,
    FaEye,
    FaEyeSlash,
} from "react-icons/fa"; 

import "./LoginPage.scss";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); 
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); 
    const [rememberMe, setRememberMe] = useState(false); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isLogin && password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        try {
            const endpoint = isLogin
                ? "http://localhost:3001/api/login"
                : "http://localhost:3001/api/register";
            const response = await axios.post(endpoint, { email, password });

            localStorage.setItem("user", JSON.stringify({token: response.data.token, email})); 
            navigate("/reading-tracker");
        } catch (err) {
            console.error(
                `${isLogin ? "Login" : "Registration"} failed:`,
                err.response?.data
            );
        }
    };

    return (
        <div className="login-container">
            <div className="login-page">
                <h2 className="login-page__title">
                    {isLogin ? "WELCOME BACK!" : "Sign Up"}
                </h2>
                <button
                    className="login-page__toggle-button"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin
                        ? "Don't have an account? Sign Up"
                        : "Already have an account? Login"}
                </button>
                <form className="login-page__form" onSubmit={handleSubmit}>
                    <label className="login-page__label" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="login-page__input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                    <label className="login-page__label" htmlFor="password">
                        Password
                    </label>
                    <div className="login-page__password-container">
                        <input
                            className="login-page__input"
                            type={isPasswordVisible ? "text" : "password"} 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                        />
                        <div
                            className="login-page__eye-icon"
                            onClick={() =>
                                setIsPasswordVisible(!isPasswordVisible)
                            }
                        >
                            {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </div>
                    </div>
                    {/* Show confirm password field only in sign-up mode */}
                    {!isLogin && (
                        <input
                            className="login-page__input"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder="Confirm Password"
                        />
                    )}
                    <div className="login-page__remember-container">
                        <input
                            type="checkbox"
                            id="rememberMe"
                            checked={rememberMe}
                            onChange={() => setRememberMe(!rememberMe)} // Toggle remember me
                        />
                        <label
                            htmlFor="rememberMe"
                            className="login-page__remember-label"
                        >
                            Remember Me
                        </label>
                    </div>
                    <button className="login-page__button" type="submit">
                        {isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>
                <div className="login-page__social-login">
                    <p className="login-page__social-text">
                        or continue with
                    </p>
                    <div className="login-page__social-icons">
                        <FaGoogle
                            className="login-page__icon"
                            title="Login with Gmail"
                        />
                        <FaFacebookF
                            className="login-page__icon"
                            title="Login with Facebook"
                        />
                        <FaApple
                            className="login-page__icon"
                            title="Login with Apple"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
