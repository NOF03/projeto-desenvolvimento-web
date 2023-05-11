import React from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as ArtCulture } from "../images/categories/artculture.svg";
import { ReactComponent as Entertainment } from "../images/categories/entertainment.svg";
import { ReactComponent as Geography } from "../images/categories/geography.svg";
import { ReactComponent as Music } from "../images/categories/music.svg";
import { ReactComponent as Science } from "../images/categories/science.svg";
import { ReactComponent as Sports } from "../images/categories/sports.svg";
import socket from "../../socket/socket";

export default function CardRoom(props) {
  const navigate = useNavigate();
  let image;
  console.log(props.item);
  switch (props.item.category) {
    case 2:
      image = <Entertainment height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case 17:
      image = <Science height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case 22:
      image = <Geography height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case 25:
      image = <ArtCulture height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case 12:
      image = <Music height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case 21:
      image = <Sports height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    default:
      image = <Sports height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
  }

  return (
    <>
      <div {...props} className=" grid p-3 h-52 bg-[#D9D9D9] w-full rounded">
        <div className="flex justify-between ">
          {image}
          <p className="text-blue-700 font-bold text-2xl">
            {props.item.usersID.length}/4
          </p>
        </div>
        <div className="text-center text-black font-extrabold text-2xl">
          <p>{props.item.name}</p>
          <label>#{props.key}</label>
        </div>
        <button
          className="bg-white font-extrabold text-xl text-[#1B48E9] hover:opacity-90 rounded w-1/4 justify-self-center my-2 disabled:opacity-60"
          onClick={() => { 
            socket.emit("join room", props.item._id, props.user);
            navigate(`/roomgame/${props.item._id}`);
          }}
        >
          Join
        </button>
      </div>
    </>
  );
}
