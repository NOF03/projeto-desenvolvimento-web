import React, { useEffect, useState } from "react";
import LogoTop from "../assets/components/LogoTop";
import { useNavigate, useParams } from "react-router-dom";
import socket from "../socket/socket";

export default function Final() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("get room", id);

    socket.on("room details", (room) => {
      const sortedUsers = room.users.sort((a, b) => b.inGameScore - a.inGameScore);
      // Update room state with sorted users array
      setRoom({ ...room, users: sortedUsers });
      setError(null);
    });

    socket.on("room error", (errorMessage) => {
      setRoom(null);
      setError(errorMessage);
    });

    // Cleanup function to remove the event listeners when the component unmounts
    return () => {
      socket.off("room details");
      socket.off("room error");
    };
  });

  const handleSubmit = () => {
    socket.emit(
      "leave room",
      id,
      window.localStorage.getItem("user"),
      navigate("/mainmenu")
    );
  };

  return (
    <>
      <LogoTop />
      {room && <>
        <div className="fixed inset-0">
        <div className="pt-20 pb-10 text-center">
          <button className="bg-white font-extrabold text-[15px] md:text-[25px] text-[#1B48E9] hover:opacity-90 rounded w-1/5 h-16  my-3 disabled:opacity-60" onClick={handleSubmit}>
            LEAVE
          </button>
        </div>
        <div className=" flex justify-center items-end h-full gap-16">
          <div className="h-4/6 w-1/4 bg-indigo-900 relative">
            <div className="absolute bg-gray-400 rounded-full h-32 w-32 left-1/2 transform -translate-x-1/2 -mt-16">
              <div className="text-black text-[50px] font-bold flex items-center justify-center h-full w-full">
                2
              </div>
            </div>
            <div className="h-2/4 w-full text-white flex flex-col pt-16 items-center">
              <div className="text-[25px] font-bold text-center pt-8">
                {room.users[1] ? room.users[1].username : ""}
              </div>
              <div className="text-[35px] font-bold text-center">
                {room.users[1] ? room.users[1].inGameScore : ""} points
              </div>
            </div>
          </div>
          <div className="h-5/6 w-1/4 bg-indigo-900">
            <div className="absolute bg-amber-400 rounded-full w-32 aspect-square left-1/2 transform -translate-x-1/2 -mt-16">
              <div className="text-black text-[50px] font-bold flex items-center justify-center h-full w-full">
                1
              </div>
            </div>
            <div className="h-2/4 w-full text-white flex flex-col pt-16 items-center">
              <div className="md:text-[30px] text-[15px] font-bold text-center pt-8">
                {room.users[0].username}
              </div>
              <div className="md:text-[50px] text-[20px] font-bold text-center">
              {room.users[0].inGameScore} points
              </div>
            </div>
          </div>
          <div className="h-3/6 w-1/4 bg-indigo-900 relative">
            <div className="absolute bg-[#CD7F32] rounded-full w-32 aspect-square left-1/2 transform -translate-x-1/2 -mt-16">
              <div className="text-black text-[50px] font-bold flex items-center justify-center h-full w-full">
                3
              </div>
            </div>
            <div className="h-2/4 w-full text-white flex flex-col pt-16 items-center">
              <div className="text-[25px] font-bold text-center pt-8">
              {room.users[2] ? room.users[2].username : ""}
              </div>
              <div className="text-[35px] font-bold text-center">
              {room.users[2] ? room.users[2].inGameScore : ""} points
              </div>
            </div>
          </div>
        </div>
      </div>
      </>}
      
    </>
  );
}
