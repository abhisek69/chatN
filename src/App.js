import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import ErrorPage from './pages/error';
import Login from './pages/login';
import CreateID from './pages/createID';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../src/pages/AuthContext';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from './components/firebase';

function App() {
  const [user,setUser]=useState();
  useEffect(()=>{
  auth.onAuthStateChanged((user)=>{
    setUser(user)
  })
  })
  
    return (
        <div>
            <AuthProvider>
                <Router>
                    <Routes>
                        <Route path="/" element={user ?<Navigate to='/home' />:<Login />}  />
                        <Route path="/createID" element={<CreateID />} />
                        <Route path="/home" element={!user?<Navigate to='/' />:<Home />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </Router>
                <ToastContainer />
            </AuthProvider>
        </div>
    );
}

export default App;
