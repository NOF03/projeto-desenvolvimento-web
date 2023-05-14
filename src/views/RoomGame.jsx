import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoTop from "../assets/components/LogoTop";
import { ReactComponent as Loader } from "../assets/images/loader.svg";
import socket from "../socket/socket";

export default function RoomGame() {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
  }, [room]);

  const handleSubmit = () => {
    socket.emit("start game", id);
    navigate(`/ingame/${id}`);
  };

  useEffect(() => {
    socket.on("redirect", () => {
      navigate(`/ingame/${id}`);
    });
  }, []);

  const leaveSubmit = () => {
    socket.emit(
      "leave room",
      id,
      window.localStorage.getItem("user"),
      navigate("/mainmenu")
    );
  };

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
            {room && window.localStorage.getItem("user") === room.host ? (
              <button
                className="bg-white font-extrabold text-xl text-[#1B48E9] hover:opacity-90 rounded w-1/3 h-16 justify-self-center my-3 disabled:opacity-60 "
                onClick={handleSubmit}
              >
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
            <button className="bg-white font-extrabold text-xl text-[#E91B1B] hover:opacity-90 rounded w-1/3 h-16 justify-self-center my-3 disabled:opacity-60" onClick={leaveSubmit}>
              LEAVE ROOM
            </button>
          </div>
          <div className="grid items-center ">
            <p className="text-3xl font-bold">Players in the room:</p>
            <ul className="list-disc pl-5 space-y-3 py-7 text-2xl">
              {room &&
                room.users.map((item, index) => <li>{item.username}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
