import React from 'react';
import LogoTop from '../assets/components/LogoTop';

export default function Final() {
    return (
        <>
            <LogoTop />
            <div className='fixed inset-0'>
                <div className='pt-20 pb-10 text-center'>
                    <button className="bg-white font-extrabold text-[15px] md:text-[25px] text-[#1B48E9] hover:opacity-90 rounded w-1/5 h-16 justify-self-center my-3 disabled:opacity-60">LEAVE</button>
                </div>
                <div className=" flex justify-center items-end h-full gap-16">
                    <div className="h-4/6 w-1/4 bg-indigo-900 relative">
                        <div className="h-2/4 w-full text-white flex flex-col pt-16 items-center">
                            <div className="text-[25px] font-bold">otorrinolaringologista77</div>
                            <div className="text-[35px] font-bold">3500 points</div>
                        </div>
                    </div>
                    <div className="h-5/6 w-1/4 bg-indigo-900">
                        <div className="h-2/4 w-full text-white flex flex-col pt-16 items-center">
                            <div className="md:text-[30px] text-[15px] font-bold">starkirt09</div>
                            <div className="md:text-[50px] text-[20px] font-bold">4500 points</div>
                            {/* <div className="text-lg md:text-xl lg:text-2xl font-bold">Username</div>
                            <div className="text-xl md:text-2xl lg:text-3xl font-bold">1000</div> */}
                        </div>
                    </div>
                    <div className="h-3/6 w-1/4 bg-indigo-900">
                        <div className="h-2/4 w-full text-white flex flex-col pt-16 items-center">
                            <div className="text-[25px] font-bold">hello_kitty69</div>
                            <div className="text-[35px] font-bold">2000 points</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}