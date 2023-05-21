import React, { useEffect, useState } from "react";
import CardRoom from "../assets/components/CardRoom";
import LogoTop from "../assets/components/LogoTop";
import socket from "../socket/socket";

export default function Rooms() {
  const [dataFromServer, setDataFromServer] = useState(null);

  useEffect(() => {
      socket.on("room-list", (data) => {
        setDataFromServer(data);
      });
    
    
    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("room-list");
    };
  }, []);


  return (
    <>
      <LogoTop />
      <div className="py-20 text-center">
        <h2>Rooms</h2>
      </div>
      <div className="container mx-auto py-20 ">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-9">
          {dataFromServer &&
            dataFromServer.map((item, index) => (
              <CardRoom item={item} user={window.localStorage.getItem("user")} key={index}/>
            ))}
        </div>
      </div>
    </>
  );
}
