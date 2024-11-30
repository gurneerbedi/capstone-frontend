import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up mode
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

            localStorage.setItem("token", response.data.token); // Store JWT token
            navigate("/reading-tracker");
        } catch (err) {
            console.error(
                `${isLogin ? "Login" : "Registration"} failed:`,
                err.response?.data
            );
        }
    };

    return (
        <div>
            <h2>{isLogin ? "Login" : "Sign Up"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Email"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Password"
                />
                {/* Show confirm password field only in sign-up mode */}
                {!isLogin && (
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        placeholder="Confirm Password"
                    />
                )}
                <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Login"}
            </button>
        </div>
    );
};

export default AuthPage;
