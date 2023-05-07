import React, { useState } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/images/Logo";
import Input from "../assets/components/Input";
import Button from "../assets/components/Button";
import { ReactComponent as Email } from "../assets/images/email.svg";
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Username } from "../assets/images/username.svg";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        body: JSON.stringify({ username, password, email }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      console.log(result);
      if (result.message === "User already exists!") {
        setErrorMessage(result.message);
        return;
      }
      navigation("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <motion.div
        className="py-20 justify-center grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 2 }}
      >
        <Logo height="320" />
        <form className=" formContainer" onSubmit={handleSubmit}>
          <Input
            type="text"
            id="email"
            placeholder="Email"
            image={<Email />}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
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
          <Button value="CREATE ACCOUNT" />
        </form>
      </motion.div>
    </>
  );
}
