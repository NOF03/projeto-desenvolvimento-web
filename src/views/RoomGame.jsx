import React from "react";
import LogoTop from "../assets/components/LogoTop";
import { ReactComponent as Loader } from "../assets/images/loader.svg";

export default function RoomGame(props) {
  return (
    <>
      <LogoTop />
      <div className=" grid h-full ">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-0 my-auto">
          <div className=" grid text-center items-center justify-items-center gap-5">
            {props.host ? (
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
              <li>sporting2003</li>
              <li>otorrinolaringologista77</li>
              <li>sporting2003</li>
              <li>otorrinolaringologista77</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
