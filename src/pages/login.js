import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './style.css';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../components/firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Ensure the CSS for toastify is imported

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [emailTouched, setEmailTouched] = useState(false); // Track if email input has been touched

    const validateEmail = () => {
        const isValid = /\S+@\S+\.\S+/.test(email);
        if (!isValid && emailTouched) { // Show error only if email is touched and invalid
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        validateEmail();
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailBlur = () => {
        setEmailTouched(true); // Mark email input as touched when blurred
        validateEmail();
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent form default submission behavior
        validateEmail();

        if (password === "") {
            setPasswordError("Please enter your password");
        } else {
            setPasswordError("");
        }

        if (!emailError && !passwordError) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                navigate("/home"); // Redirect to the home page upon successful login
            } catch (error) {
                console.error("Error logging in:", error);
                toast.error("Invalid email or password", { position: "bottom-center" });
            }
        }
    };

    return (
        <div className="page flex items-center justify-center h-screen">
            <div className="login bg-white shadow-lg rounded-md p-8">
                <form className="form w-full" onSubmit={handleSubmit}>
                    <h2 className="text-3xl mb-6 text-center text-purple-800">Login</h2>
                    <div className={`inputGRP mb-4 ${emailError && emailTouched ? "border-red-500" : ""}`}>
                        <label className="block text-sm text-gray-700">Email or mobile No.</label>
                        <input
                            type="text"
                            className={`inputBX ${emailError && emailTouched ? "border-red-500" : ""}`}
                            value={email}
                            onChange={handleEmailChange}
                            onBlur={handleEmailBlur}
                        />
                        {emailError && emailTouched && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
                    </div>
                    <div className="inputGRP mb-6">
                        <label className="block text-sm text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                className={`inputBX ${passwordError ? "border-red-500" : ""}`}
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent focus:outline-none"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? (
                                    <svg className="h-5 w-5 text-purple-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                ) : (
                                    <svg className="h-5 w-5 text-purple-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9a6 6 0 0112 0v2a6 6 0 01-12 0V9z" />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">Don't have an account?</p>
                        <Link to="/CreateID" className="ml-2 text-sm font-medium text-green-600 hover:text-green-700">Create an account</Link>
                    </div>
                    <button type="submit" className="w-full bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
