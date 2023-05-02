import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import SplashScreen from './views/SplashScreen.jsx';
import LogIn from './views/Login.jsx';
import SignUp from './views/SignUp.jsx';
import RecoverPassword from './views/RecoverPassword.jsx';
import Rooms from './views/Rooms.jsx'
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode='wait'>
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recoverpassword" element={<RecoverPassword />} />
        <Route path="/rooms" element={<Rooms />} />
      </Routes>
    </AnimatePresence>

  );

};

