import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Button from "../assets/components/Button";
import Input from "../assets/components/Input";
import Logo from "../assets/images/Logo";
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Username } from "../assets/images/username.svg";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const {setUser} = useContext(UserContext);
  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
      });
      const result = await response.json();
      setUser(result);
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
