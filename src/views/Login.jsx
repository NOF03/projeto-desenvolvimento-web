import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/Logo';
import Input from '../assets/components/Input';
import Button from '../assets/components/Button';
import { ReactComponent as Password } from '../assets/images/password.svg';
import { ReactComponent as Username } from '../assets/images/username.svg';
import { motion } from "framer-motion";

const Login = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10"
      );
      const parsed = await response.json();
      setData(parsed);
    })();
  }, []);
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default function SplashScreen() {

  return (

    <>
      <motion.div className=' py-20 justify-center grid' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
        <Logo height="320" />
        <form action="/action_page.php" className='my-3'>
          <Input type='text' id="fname" placeholder='Username' image={<Username />} />
          <Input type='password' id="lname" placeholder='Password' image={<Password />} />
          <Button value='LOGIN' />
        </form>
        <div className='justify-between flex'>
          <a href='/signup'>Create Account</a>
          <a href='/recoverpassword'>Forgot Password?</a>
        </div>


      </motion.div>
    </>


  );

};

