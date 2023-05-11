import React, { useState, useEffect } from "react";
import LogoTop from "../assets/components/LogoTop";
import { ReactComponent as Loader } from "../assets/images/loader.svg";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import socket from "../socket/socket";

export default function RoomGame() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    socket.emit("get room", id);

    socket.on("room details", (room) => {
      setRoom(room);
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <LogoTop />
      <div className=" grid h-full ">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0 my-auto">
          <div className=" grid text-center items-center justify-items-center gap-5">
            {room && Cookies.get("token") == room.host ? (
              <button className="bg-white font-extrabold text-xl text-[#1B48E9] hover:opacity-90 rounded w-1/3 h-16 justify-self-center my-3 disabled:opacity-60 ">
                START
              </button>
            ) : (
              <>
                <p className="text-4xl font-bold">
                  Waiting for host to start...
                </p>
                <Loader className="animate-spin my-4" />
              </>
            )}
            <button className="bg-white font-extrabold text-xl text-[#E91B1B] hover:opacity-90 rounded w-1/3 h-16 justify-self-center my-3 disabled:opacity-60">
              LEAVE ROOM
            </button>
          </div>
          <div className="grid items-center ">
            <p className="text-3xl font-bold">Players in the room:</p>
            <ul className="list-disc pl-5 space-y-3 py-7 text-2xl">
              {room &&
                room.usersID.map((item, index) => <li>{item._id}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
