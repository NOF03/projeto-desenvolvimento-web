import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SplashScreen from './views/SplashScreen.jsx';
import LogIn from './views/Login.jsx';
import SignUp from './views/SignUp.jsx';
import RecoverPassword from './views/RecoverPassword.jsx';

export default function App() {

  return (
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recoverpassword" element={<RecoverPassword />} /> 
      </Routes>
  );

};

