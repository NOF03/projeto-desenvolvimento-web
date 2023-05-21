import axios from "axios";
import React, { useEffect, useState } from "react";
import LogoTop from "../assets/components/LogoTop";
import { ReactComponent as Pencil } from "../assets/images/pencil.svg";
import { ReactComponent as Escape } from "../assets/images/x.svg";
import socket from '../socket/socket';

export default function Account() {
  const apiURL = process.env.REACT_APP_BASE_API_URL;
  const [user, setUser] = useState(null);
  const [changeAvatar, setChangeAvatar] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userID = window.localStorage.getItem("user");
      try {
        const { data } = await axios.post(`${apiURL}/auth/profile`, { userID });
        setUser(data.user);
      } catch (err) {
        console.error(err);
      }
    };

    // Call fetchData with an event object
    const event = { preventDefault: () => {} };
    fetchData(event);
  }, []);

  const avatarSource = selectedAvatar || (user && user.avatar);

  const openAvatars = () => {
    setChangeAvatar(true);
  };

  const closeAvatars = () => {
    setChangeAvatar(false);
  };

  const selectAvatar = async (avatar) => {
    setSelectedAvatar(avatar);
    socket.emit("change avatar", window.localStorage.getItem("user"), avatar)
    setChangeAvatar(false);
  };

  return (
    <>
      {changeAvatar && (
        <div className="fixed w-full h-full opacity-100">
          <div className="flex justify-center items-center h-full">
            <div className="bg-[#343363] w-[1000px] h-[600px] rounded-[67px] flex relative justify-center items-center">
              <div className="absolute top-8 right-8">
                <button onClick={closeAvatars}>
                  <Escape />
                </button>
              </div>
              <div className="grid grid-cols-4 gap-10">
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/cbf891dd6214aa905f48c352967eda1e?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/cbf891dd6214aa905f48c352967eda1e?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/173f1e9baa96e7281b4733c6db217c05?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/173f1e9baa96e7281b4733c6db217c05?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/e1e654040c2fcc4d6a153e9fbfc5db8c?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/e1e654040c2fcc4d6a153e9fbfc5db8c?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/91eb30245a872c405bb0c2e510104b40?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/91eb30245a872c405bb0c2e510104b40?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/55d7555ce0c4d5d1ddd7c9b66b738468?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/55d7555ce0c4d5d1ddd7c9b66b738468?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/c45d3a8afe05f83aebb8fca522393f20?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/c45d3a8afe05f83aebb8fca522393f20?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/331082c773f62a8c9e6c220ada69e892?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/331082c773f62a8c9e6c220ada69e892?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
                <button
                  onClick={() =>
                    selectAvatar(
                      "https://robohash.org/fcdf6fe0beadf6488c0cf13261e694e2?set=set4&bgset=&size=400x400"
                    )
                  }
                >
                  <img
                    src="https://robohash.org/fcdf6fe0beadf6488c0cf13261e694e2?set=set4&bgset=&size=400x400"
                    alt=""
                    className="h-48 w-48"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <LogoTop />
      {user && (
        <>
          <div className="flex items-center h-1/2 pl-24">
            <div className="relative h-48 w-48">
              <img src={avatarSource} alt="" className="h-full w-full" />
              <button onClick={openAvatars}>
                <Pencil className="absolute bottom-0 right-0 w-12 h-12" />
              </button>
            </div>
            <div className="ml-20">
              <p className="text-[25px] mb-4 font-bold ">
                Username: {user.username}
              </p>
              <p className="text-[25px] mt-4 font-bold ">Email: {user.email}</p>
            </div>
          </div>
          <div className="grid justify-items-center text-center gap-28">
            <div className="grid grid-cols-2 gap-40 ">
              <Section value={user.gamesPlayed} label="Games Played" />
              <Section value={user.accountCreatedDate} label="Created Date" />
            </div>
            <div className="grid grid-cols-3 gap-48">
              <Section value={user.totalScore} label="Total Score" />
              <Section value={user.correctAnswers} label="Correct Answers" />
              <Section
                value={user.incorrectAnswers}
                label="Incorrect Answers"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

function Section(props) {
  return (
    <div>
      <p className="text-3xl text center mb-2 font-bold">{props.value}</p>
      <p className="text-3xl font-bold">{props.label}</p>
    </div>
  );
}
