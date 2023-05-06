import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SplashScreen from './views/SplashScreen.jsx';
import LogIn from './views/Login.jsx';
import SignUp from './views/SignUp.jsx';
import RecoverPassword from './views/RecoverPassword.jsx';
import Rooms from './views/Rooms.jsx';
import RoomGame from './views/RoomGame.jsx';
import Category from './views/Category.jsx';
import InGame from './views/InGame.jsx';

export default function App() {
  return (
      <Routes >
        <Route path="/" element={<SplashScreen />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/recoverpassword" element={<RecoverPassword />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/roomgame" element={<RoomGame host={true}/>} />
        <Route path="/category" element={<Category />} />
        <Route path="/ingame" element={<InGame />} />
      </Routes>

  );

};

