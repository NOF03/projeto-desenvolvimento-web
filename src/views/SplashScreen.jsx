import React, { useEffect } from "react";
import Logo from "../assets/images/Logo";
import { useNavigate } from "react-router-dom";

export default function SplashScreen() {
  const navigation = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation("/login");
    }, 6000); // Change to the number of milliseconds you want to delay the navigation for

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      <div className=" text-center justify-center items-center flex h-full">
        <h1 className="fragmerAnimation">FRAGMER</h1>
        <Logo height="500" />
        <h1 className="gameAnimation">GAME</h1>
      </div>

      <style>
        {`
    svg {
      animation-name: logo;
      animation-duration: 5s;
      animation-fill-mode: both;
    }

    h1 {
      color: white;
      font-size: 60px;
      font-weight: 600;
    }

    .gameAnimation {
      animation-name: left;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
    }

    .fragmerAnimation {
      animation-name: right;
      animation-duration: 3s;
      animation-delay: 2s;
      animation-timing-function: ease-in-out;
      animation-fill-mode: both;
    }

    @keyframes logo {
      0% {opacity: 0}
      50% { transform: rotate(0deg); opacity: 1}
      100% {transform: rotate(360deg); opacity: 0}
    }

    @keyframes left {
      from {transform: translate(0px)}
      to {transform: translate(-12vw)}
    }

    @keyframes right {
      from {transform: translate(0px)}
      to {transform: translate(12vw)}
    }
    `}
      </style>
    </>
  );
}
