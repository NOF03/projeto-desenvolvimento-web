import axios from "axios";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../assets/components/Button";
import Input from "../assets/components/Input";
import Logo from "../assets/images/Logo";
import { ReactComponent as Email } from "../assets/images/email.svg";
import { ReactComponent as Password } from "../assets/images/password.svg";
import { ReactComponent as Username } from "../assets/images/username.svg";

export default function SignUp() {
  const apiURL = process.env.REACT_APP_BASE_API_URL;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  const navigation = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(`${apiURL}/auth/register`, {
        username,
        password,
        email,
      });
      navigation("/login");
    } catch (err) {
      setErrorMessage("User already exists!");
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
