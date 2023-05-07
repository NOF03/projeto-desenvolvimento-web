import React from "react";
import LogoTop from "../assets/components/LogoTop";

import { ReactComponent as Leave } from "../assets/images/leave.svg";

import { ReactComponent as Avatar1 } from "../assets/images/avatars/avatar1.svg";
/* 
import { ReactComponent as Avatar2 } from '../assets/images/avatars/avatar2.svg'
import { ReactComponent as Avatar3 } from '../assets/images/avatars/avatar3.svg'
import { ReactComponent as Avatar4 } from '../assets/images/avatars/avatar4.svg'
import { ReactComponent as Avatar5 } from '../assets/images/avatars/avatar5.svg'
import { ReactComponent as Avatar6 } from '../assets/images/avatars/avatar6.svg'
import { ReactComponent as Avatar7 } from '../assets/images/avatars/avatar7.svg'
import { ReactComponent as Avatar8 } from '../assets/images/avatars/avatar8.svg'
*/
import { ReactComponent as Correct } from "../assets/images/correct.svg";
//import { ReactComponent as Incorrect } from '../assets/images/incorrect.svg'

function LeaveButton() {
  return (
    <button className=" absolute left-0 top-0 p-9 hover:text-red-600">
      <div className="flex items-center gap-2">
        <Leave />
        <span className="text-2xl font-bold">Leave</span>
      </div>
    </button>
  );
}

function OneQuestion(props) {
  return (
    <div className="grid items-center text-center h-32 bg-white rounded-full">
      <span className=" pl-36 pr-4 text-xl md:text-4xl font-bold text-black">
        {props.label}
      </span>
      <div className="absolute flex bg-[#999999] h-40 w-40 items-center justify-center rounded-full text-6xl font-black text-black">
        23
      </div>
    </div>
  );
}

function OneAnswer(props) {
  return (
    <button>
      <div className="grid items-center text-center h-28 bg-white rounded-full">
        <span className=" pl-32 pr-2 text-lg md:text-3xl font-bold text-black">
          {props.label}
        </span>
        <div className="absolute flex bg-[#DDDDDD] h-32 w-32 items-center justify-center rounded-full text-5xl font-bold text-[#696969]">
          A
        </div>
      </div>
    </button>
  );
}

function Game() {
  return (
    <>
      <div className="pt-20 pb-10 text-center">
        <p className="text-2xl font-bold">Tempo Restante</p>
        <p className="text-5xl font-bold">0:16</p>
      </div>
      <div className="container grid mx-auto px-20 gap-28">
        <OneQuestion label="Which country has the most islands in the world?" />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-24 gap">
          <OneAnswer label="Entertainment" />
          <OneAnswer label="Science" />
          <OneAnswer label="Geography" />
          <OneAnswer label="Art & Culture" />
        </div>
      </div>
    </>
  );
}

function CardScore(props) {
  return (
    <>
      <div
        {...props}
        className=" grid py-10 h-full bg-[#343363] w-full rounded-2xl gap-5"
      >
        <div className="flex justify-center">{props.image}</div>
        <div className="text-center font-extrabold text-2xl">
          <p>otorrinolaringologista77</p>
          <label>3000</label>
          <label className="font-normal"> points</label>
        </div>
        <div className="flex justify-center">
          <Correct />
        </div>
      </div>
    </>
  );
}

function Score() {
  return (
    <>
      <div className="py-24"></div>
      <div className="items-center justify-center h-max flex">
        <div className="container m-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-9">
            <CardScore image={<Avatar1 />} />
            <CardScore image={<Avatar1 />} />
            <CardScore image={<Avatar1 />} />
            <CardScore image={<Avatar1 />} />
          </div>
        </div>
      </div>
    </>
  );
}

export default function InGame() {
  return (
    <>
      <LeaveButton />
      <LogoTop />
      <Game />
      <Score />
    </>
  );
}
