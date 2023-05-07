import React from "react";
import LogoTop from "../assets/components/LogoTop";

export default function Final() {
  return (
    <>
      <LogoTop />
      <div className="fixed inset-0">
        <div className="pt-20 pb-10 text-center">
          <button className="bg-white font-extrabold text-[15px] md:text-[25px] text-[#1B48E9] hover:opacity-90 rounded w-1/5 h-16  my-3 disabled:opacity-60">
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
                otorrinolaringologista77
              </div>
              <div className="text-[35px] font-bold text-center">
                3500 points
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
                starkirt09
              </div>
              <div className="md:text-[50px] text-[20px] font-bold text-center">
                4500 points
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
                hello_kitty69
              </div>
              <div className="text-[35px] font-bold text-center">
                2000 points
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
