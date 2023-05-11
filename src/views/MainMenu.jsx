import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../assets/components/Button";
import Logo from "../assets/images/Logo";
import { ReactComponent as Profile } from "../assets/images/profile.svg";

export default function MainMenu() {
  const apiURL = process.env.REACT_APP_BASE_API_URL;

  const navigate = useNavigate();
  async function logout() {
    await axios.post(`${apiURL}/auth/logout`);
    navigate("/login");
  }

  return (
    <>
      <div className="fixed top-0 right-0 flex justify-between items-center p-4 gap-5">
        <button className="text-[20px] font-bold hover:text-red-600" onClick={logout}>
          LOG OUT
        </button>
        <button onClick={() => navigate(`/account`)}>
          <Profile />
        </button>
      </div>
      <div className=" py-8 justify-center grid text-center">
        <Logo height="500" />
        <p className="text-[65px] font-bold pb-10">Fragmer Game</p>
      </div>
      <div className="flex justify-center gap-40 px-10 lg:px-80">
        <Button
          value="CREATE ROOM"
          onClick={() => {
            navigate("/category");
          }}
        />
        <Button
          value="JOIN ROOM"
          onClick={() => {
            navigate("/rooms");
          }}
        />
      </div>
    </>
  );
}
