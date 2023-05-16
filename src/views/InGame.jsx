import axios from "axios";
import he from "he";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoTop from "../assets/components/LogoTop";
import { ReactComponent as Avatar1 } from "../assets/images/avatars/avatar1.svg";
import { ReactComponent as Leave } from "../assets/images/leave.svg";
import { ReactComponent as Correct } from "../assets/images/correct.svg";
import { ReactComponent as Incorrect } from "../assets/images/incorrect.svg";
import socket from "../socket/socket";

function LeaveButton(props) {
  return (
    <button
      className=" absolute left-0 top-0 p-9 hover:text-red-600"
      {...props}
    >
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
        {props.index}
      </div>
    </div>
  );
}

function OneAnswer(props) {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(true);
    if (props.label === props.correctAnswer) {
      console.log("scoreAdded");
      socket.emit(
        "addScoreToUser",
        window.localStorage.getItem("user"),
        props.timer * 200,
        props.idRoom
      );
    } else {
      socket.emit(
        "noAddScoreToUser",
        window.localStorage.getItem("user"),
        props.idRoom
      );
    }
    props.onClick();
  };

  return (
    <button value={props.label} {...props} onClick={handleClick}>
      <div
        className={`grid items-center text-center h-28 bg-white rounded-full ${
          isSelected ? "border-2 border-orange-500" : ""
        }`}
      >
        <span className=" pl-32 pr-2 text-lg md:text-3xl font-bold text-black">
          {props.label}
        </span>
        <div
          className={`absolute flex bg-[#DDDDDD] h-32 w-32 items-center justify-center rounded-full text-5xl font-bold text-[#696969] ${
            isSelected ? "border-4 border-orange-500" : ""
          }`}
        >
          {props.index}
        </div>
      </div>
    </button>
  );
}

function Game(props) {
  const [isDisabled, setIsDisabled] = useState(false);
  const handleClick = () => {
    setIsDisabled(true);
  };

  return (
    <>
      <div className="pt-20 pb-10 text-center">
        <p className="text-2xl font-bold">Tempo Restante</p>
        <p className="text-5xl font-bold">{props.timer}</p>
      </div>
      <div className="container grid mx-auto px-20 gap-28">
        <OneQuestion label={props.question.question} index={props.index + 1} />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-24 gap">
          {props.question.answers.map((answer, index) => {
            return (
              <OneAnswer
                label={answer}
                index={index + 1}
                disabled={isDisabled}
                onClick={handleClick}
                correctAnswer={props.question.correctAnswer}
                timer={props.timer}
                idRoom={props.id}
              />
            );
          })}
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
          <p>{props.user.username}</p>
          <label>{props.user.inGameScore}</label>
          <label className="font-normal"> points</label>
        </div>
        <div className="flex justify-center">
          {props.user.inGameCorrectAnswer ? <Correct /> : <Incorrect />}
        </div>
      </div>
    </>
  );
}

function Score(props) {
  console.log(props.room);
  return (
    <>
      <div className="py-24"></div>
      <div className="items-center justify-center h-max flex">
        <div className="container m-auto ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-9 ">
            {props.room.users.map((user) => {
              return <CardScore image={<Avatar1 />} user={user} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default function InGame() {
  const { id } = useParams();
  const [questions, setQuestions] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [room, setRoom] = useState(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [showScore, setShowScore] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchQuestions = async (id) => {
    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`
      );
      const { results } = await response.data;
      console.log(results);
      const formattedQuestions = results.map((question) => {
        const {
          correct_answer,
          incorrect_answers,
          question: questionText,
        } = question;

        // Shuffle the answers so that the correct answer is not always in the same position
        const allAnswers = [
          ...incorrect_answers.map((answer) => he.decode(answer)),
          he.decode(correct_answer),
        ].sort(() => 0.5 - Math.random());

        return {
          question: he.decode(questionText),
          answers: allAnswers,
          correctAnswer: correct_answer,
        };
      });

      setQuestions(formattedQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    socket.emit("get room", id);

    socket.on("room details", (room) => {
      setRoom(room);
      setError(null);
    });

    socket.on("room error", (errorMessage) => {
      setRoom(null);
      setError(errorMessage);
    });

    // Cleanup function to remove the event listeners when the component unmounts
    return () => {
      socket.off("room details");
      socket.off("room error");
    };
  }, [showScore]);

  useEffect(() => {
    if (room && !questions) {
      fetchQuestions(room.category);
    }
  }, [room]);

  useEffect(() => {
    if (questions) {
      if (timeLeft <= 0) {
        if (!showScore) {
          if (currentQuestionIndex < questions.length - 1) {
            setTimeLeft(10);
            setShowScore(true);
          } else {
            navigate(`/final/${id}`);
          }
        } else {
          setTimeLeft(20);
          setCurrentQuestionIndex(currentQuestionIndex + 1);
          setShowScore(false);
        }
      } else {
        const timer = setTimeout(() => {
          setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [timeLeft, questions]);

  const handleSubmit = () => {
    socket.emit(
      "leave room",
      id,
      window.localStorage.getItem("user"),
      navigate("/mainmenu")
    );
  };

  return (
    <>
      <LeaveButton onClick={handleSubmit} />
      <LogoTop />
      {!showScore && questions ? (
        <Game
          question={questions[currentQuestionIndex]}
          timer={timeLeft}
          index={currentQuestionIndex}
          score={score}
          id={id}
        />
      ) : room ? (
        <Score room={room} />
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
