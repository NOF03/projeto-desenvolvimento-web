import React, { useState, useEffect } from "react";
import LogoTop from "../assets/components/LogoTop";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import { ReactComponent as Avatar5 } from "../assets/images/avatars/avatar5.svg";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";

export default function Account() {
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const navigation = useNavigate();

  const getUserById = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/getuser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      setUser(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserById();
  });

  return (
    <>
      <LogoTop />

      <div className="flex items-center h-1/2 pl-24">
        <div className="relative h-48 w-48">
          <Avatar5 className="absolute h-full w-full" />
          <Pencil className="absolute bottom-2 right-4 w-10 h-10" />
        </div>
        <div className="ml-20">
          <p className="text-[25px] mb-4 font-bold ">
            Username: {user.username}
          </p>
          <p className="text-[25px] mt-4 font-bold ">Email: {user.email}</p>
        </div>
      </div>
      <div className="grid justify-items-center text-center gap-28">
        <div className="grid grid-cols-2 gap-40 ">
          <Section value={45} label="Games Played" />
          <Section value={10000} label="Time Played" />
        </div>
        <div className="grid grid-cols-3 gap-48">
          <Section value={3500} label="Total Score" />
          <Section value={92} label="Correct Answers" />
          <Section value={4} label="Incorrect Answers" />
        </div>
      </div>
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
