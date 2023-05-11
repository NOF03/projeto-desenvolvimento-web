import React, { useEffect, useState } from "react";
import LogoTop from "../assets/components/LogoTop";
import socket from "../socket/socket";
import CardRoom from "../assets/components/CardRoom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Rooms() {
  const [dataFromServer, setDataFromServer] = useState(null);
  const apiURL = process.env.REACT_APP_BASE_API_URL;

  useEffect(() => {
    socket.on("room-list", (data) => {
      console.log("Received data from server:", data);
      setDataFromServer(data);
      console.log(dataFromServer)
    });

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("room-list");
    };
  });

  useEffect(() => {
    console.log(dataFromServer);
  }, [dataFromServer]);

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
              <CardRoom key={index} item={item} user={Cookies.get("token")} />
            ))}
        </div>
      </div>
    </>
  );
}
