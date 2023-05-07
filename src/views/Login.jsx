import React, { useState } from "react";
import Logo from "../assets/images/Logo";
import Input from "../assets/components/Input";
import Button from "../assets/components/Button";
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Username } from "../assets/images/username.svg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { render } from "react-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigate();

  const [_, setCookies] = useCookies(["access_token"]);
  setCookies("access_token", "");
  window.localStorage.removeItem("userID");
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (!result.userID) {
        setErrorMessage(result.message);
        return;
      }
      setCookies("access_token", result.token);
      window.localStorage.setItem("userID", result.userID);
      navigation("/mainmenu");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <motion.div
        className=" py-20 justify-center  grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <Logo height="320" />
        <form onSubmit={handleSubmit} className="my-3">
          <Input
            type="text"
            id="username"
            placeholder="Username"
            image={<Username />}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <Input
            type="password"
            id="password"
            placeholder="Password"
            image={<Password />}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <p className="text-center">{errorMessage}</p>
          <Button value="LOGIN" />
        </form>
        <div className="justify-between flex">
          <a href="/signup">Create Account</a>
          <a href="/recoverpassword">Forgot Password?</a>
        </div>
      </motion.div>
    </>
  );
}
