import React, { useState } from "react";
import { Link } from "react-router-dom";
import './style.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="page flex items-center justify-center h-screen">

            <div className="login bg-white shadow-lg rounded-md p-8">
                <form className="form w-full">
                    <h2 className="text-3xl mb-6 text-center text-purple-800">Login</h2>
                    <div className="inputGRP mb-4">
                        <label className="block  text-sm text-gray-700">Email or mobile No.</label>
                        <input type="text" className="inputBX" />
                    </div>
                    <div className="inputGRP mb-6">
                        <label className="block  text-sm text-gray-700">Password</label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} className="inputBX" />
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
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-sm text-gray-600">Don't have an account?</p>
                        <Link to="/CreateID" className="ml-2 text-sm font-medium text-green-600 hover:text-green-700">Create an account</Link>
                    </div>
                    <Link to="/Home" className="ml-2"><button className="w-full bg-purple-500 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md">Login</button></Link>
                   
                </form>
            </div>
       
     </div>
    );
}

export default Login;
