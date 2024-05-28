import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth , db } from "../components/firebase";
import { setDoc , doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import './style.css';

const CreateID = () => {
    const navigate = useNavigate();
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        number: "",
        password: "",
        confirmPassword: ""
    });
    const [formErrors, setFormErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmShowPassword] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmShowPassword(!showConfirmPassword);
    };

    const validate = () => {
        let errors = {};
        if (!formValues.name) {
            errors.name = "Name is required";
        }
        if (!formValues.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
            errors.email = "Email is invalid";
        }
        if (!formValues.number) {
            errors.number = "Number is required";
        } else if (!/^\d{10}$/.test(formValues.number)) {
            errors.number = "Number must be 10 digits";
        }
        if (!formValues.password) {
            errors.password = "Password is required";
        } else if (!/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formValues.password)) {
            errors.password = "Password must be at least 8 characters, include 1 uppercase, 1 number, and 1 symbol";
        }
        if (formValues.password !== formValues.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validate();
        if (Object.keys(errors).length === 0) {
            try {
                await createUserWithEmailAndPassword(auth, formValues.email, formValues.password);
                const user = auth.currentUser;
                console.log("User registered successfully",user);
                toast.success(`${formValues.name} registered successfully`,{position:"bottom-center"})
                if(user){
                    await setDoc(doc(db,"Users",user.uid),{
                        email:user.email,
                        userName:formValues.name,
                        number:formValues.number
                    })
                }
                navigate('/')
            } catch (error) {
                console.error("Error registering user:", error);
                toast.error(error.message,{position:"bottom-center"})
                setFormErrors({ firebase: error.message });
            }
        } else {
            setFormErrors(errors);
        }
    };

    return (
        <div className="page flex items-center justify-center h-screen">
            <div className="login bg-white shadow-lg rounded-md p-8">
                <form className="form w-full" onSubmit={handleSubmit}>
                    <h2 className="text-3xl mb-6 text-center text-purple-800">CreateID</h2>
                    <div className="inputGRP mb-4">
                        <label className="block text-sm text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            className="inputBX"
                            value={formValues.name}
                            onChange={handleChange}
                        />
                        {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                    </div>
                    <div className="inputGRP mb-4">
                        <label className="block text-sm text-gray-700">Email</label>
                        <input
                            type="text"
                            name="email"
                            className="inputBX"
                            value={formValues.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                    </div>
                    <div className="inputGRP mb-4">
                        <label className="block text-sm text-gray-700">Number</label>
                        <input
                            type="number"
                            name="number"
                            className="inputBX"
                            value={formValues.number}
                            onChange={handleChange}
                        />
                        {formErrors.number && <p className="text-red-500 text-sm">{formErrors.number}</p>}
                    </div>
                    <div className="inputGRP mb-6">
                        <label className="block text-sm text-gray-700">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                className="inputBX"
                                value={formValues.password}
                                onChange={handleChange}
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
                        {formErrors.password && <p className="text-red-500 text-sm">{formErrors.password}</p>}
                    </div>
                    <div className="inputGRP mb-6">
                        <label className="block text-sm text-gray-700">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="inputBX"
                                value={formValues.confirmPassword}
                                onChange={handleChange}
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-0 px-3 flex items-center bg-transparent focus:outline-none"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {showConfirmPassword ? (
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
                        {formErrors.confirmPassword && <p className="text-red-500 text-sm">{formErrors.confirmPassword}</p>}
                    </div>
                    <div className="flex items-center justify-center">
                        <button type="submit" className="bg-purple-800 text-white py-2 px-4 rounded-md">Create ID</button>
                    </div>
                </form>
                <div className="flex justify-center mt-6">
                    <Link to="/" className="text-purple-800">Back to Login</Link>
                </div>
            </div>
        </div>
    );
};

export default CreateID;
