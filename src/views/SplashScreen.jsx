import React from 'react';
import Logo from '../assets/images/Logo';


export default function SplashScreen() {
    
    return (

        <>
            <div className=' container text-center justify-content-center align-items-center full '>
                <h1 className='fragmerAnimation'>FRAGMER</h1>
                <Logo height="500" />
                <h1 className='gameAnimation'>GAME</h1>
            </div>



            <style>
                {`
    .full {
      height: 100%;
      display: flex;
    }
    .row {
      
    }
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

};

