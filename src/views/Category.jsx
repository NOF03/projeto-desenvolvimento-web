import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../assets/components/Input";
import LogoTop from "../assets/components/LogoTop";
import { ReactComponent as ArtCulture } from "../assets/images/categories/artculture.svg";
import { ReactComponent as Entertainment } from "../assets/images/categories/entertainment.svg";
import { ReactComponent as Geography } from "../assets/images/categories/geography.svg";
import { ReactComponent as Music } from "../assets/images/categories/music.svg";
import { ReactComponent as Science } from "../assets/images/categories/science.svg";
import { ReactComponent as Sports } from "../assets/images/categories/sports.svg";
import socket from "../socket/socket";

function OneCateg(props) {
  return (
    <button
      {...props}
      className="grid items-center justify-center text-center"
      name="categ"
    >
      {props.image}
      <p className="text-xl font-bold">{props.label}</p>
    </button>
  );
}

export default function Category() {
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const handleCreateRoom = async (event, value) => {
    event.preventDefault();
    if (!roomName) return;
    const userID = window.localStorage.getItem("user");
    socket.emit("create room", roomName, value, userID);
    socket.on("room list", (data) => {
      socket.emit("join room", data, userID);
      navigate(`/roomgame/${data}`);
    });
  };

  return (
    <>
      <LogoTop />
      <div className="pt-20 pb-10 text-center">
        <h2>Choose a Category</h2>
      </div>
      <div className="container mx-auto">
        <Input
          type="text"
          id="roomname"
          placeholder="Roomname"
          value={roomName}
          onChange={(event) => setRoomName(event.target.value)}
        />

        <div className="grid mx-32 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-y-16">
          <OneCateg
            image={<Entertainment height="160px" />}
            label="Entertainment"
            onClick={(e) => handleCreateRoom(e, 2)}
          />
          <OneCateg
            image={<Science height="160px" />}
            label="Science"
            onClick={(e) => handleCreateRoom(e, 17)}
          />
          <OneCateg
            image={<Geography height="160px" />}
            label="Geography"
            onClick={(e) => handleCreateRoom(e, 22)}
          />
          <OneCateg
            image={<ArtCulture height="160px" />}
            label="Art & Culture"
            onClick={(e) => handleCreateRoom(e, 25)}
          />
          <OneCateg
            image={<Music height="160px" />}
            label="Music"
            onClick={(e) => handleCreateRoom(e, 12)}
          />
          <OneCateg
            image={<Sports height="160px" />}
            label="Sports"
            onClick={(e) => handleCreateRoom(e, 21)}
          />
        </div>
      </div>
    </>
  );
}
