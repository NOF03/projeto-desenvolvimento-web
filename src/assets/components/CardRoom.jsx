import React from "react";
import { ReactComponent as ArtCulture } from "../images/categories/artculture.svg";
import { ReactComponent as Entertainment } from "../images/categories/entertainment.svg";
import { ReactComponent as Geography } from "../images/categories/geography.svg";
import { ReactComponent as Music } from "../images/categories/music.svg";
import { ReactComponent as Science } from "../images/categories/science.svg";
import { ReactComponent as Sports } from "../images/categories/sports.svg";

export default function CardRoom(props) {
  let image;

  switch (props.type) {
    case "Entertainment":
      image = <Entertainment height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case "Science":
      image = <Science height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case "Geography":
      image = <Geography height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case "ArtCulture":
      image = <ArtCulture height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case "Music":
      image = <Music height="72" preserveAspectRatio="xMinYMid meet" />;
      break;
    case "Sports":
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
          <p className="text-blue-700 font-bold text-2xl">{props.size}/4</p>
        </div>
        <div className="text-center text-black font-extrabold text-2xl">
          <p>Room Name</p>
          <label>#130</label>
        </div>
        <button className="bg-white font-extrabold text-xl text-[#1B48E9] hover:opacity-90 rounded w-1/4 justify-self-center my-2 disabled:opacity-60">
          Join
        </button>
      </div>
    </>
  );
}
