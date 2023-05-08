import React, { useEffect, useState, useContext } from "react";
import LogoTop from "../assets/components/LogoTop";

import { useNavigate, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { ReactComponent as Avatar5 } from "../assets/images/avatars/avatar5.svg";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";

export default function Account() {
  const navigation = useNavigate();
  const {user, ready, setUser} = useContext(UserContext);
  const getUserById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          
        },
        credentials: 'include',
      });
      const user = await response.json();
      console.log(user);
      setUser(user);
    } catch (err) {
      console.log(err);
    }
  };

  if (!ready) {
    return 'Loading...';
  }

  if (ready && !user) {
    return <Navigate to={'/login'} />
  }

  return (
    <>
      <LogoTop />
      {user && (
        <>
          <div className="flex items-center h-1/2 pl-24">
            <div className="relative h-48 w-48">
              <Avatar5 className="absolute h-full w-full" />
              <Pencil className="absolute bottom-2 right-4 w-10 h-10" />
            </div>
            <div className="ml-20">
              <p className="text-[25px] mb-4 font-bold ">
                Username: {user.user.username}
              </p>
              <p className="text-[25px] mt-4 font-bold ">
                Email: {user.user.email}
              </p>
            </div>
          </div>
          <div className="grid justify-items-center text-center gap-28">
            <div className="grid grid-cols-2 gap-40 ">
              <Section value={user.user.gamesPlayed} label="Games Played" />
              <Section
                value={user.user.accountCreatedDate}
                label="Created Date"
              />
            </div>
            <div className="grid grid-cols-3 gap-48">
              <Section value={user.user.totalScore} label="Total Score" />
              <Section
                value={user.user.correctAnswers}
                label="Correct Answers"
              />
              <Section
                value={user.user.incorrectAnswers}
                label="Incorrect Answers"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Section(props) {
  return (
    <div>
      <p className="text-3xl text center mb-2 font-bold">{props.value}</p>
      <p className="text-3xl font-bold">{props.label}</p>
    </div>
  );
}
