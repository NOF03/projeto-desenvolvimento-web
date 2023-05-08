import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Logo from "../assets/images/Logo";
import Button from "../assets/components/Button";
import { ReactComponent as Profile } from "../assets/images/profile.svg";

export default function MainMenu() {
  const navigate = useNavigate();
  const {setUser} = useContext(UserContext);
  async function logout() {
    await fetch(
      `http://localhost:3001/auth/logout`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      }
    ); 
    setUser(null);
    navigate('/login');
  }

  return (
    <>
      <div className="fixed top-0 right-0 flex justify-between items-center p-4 gap-5">
        <button
          className="text-[20px] font-bold"
          onClick={logout}
        >
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
