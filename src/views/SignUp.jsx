import React from 'react';
import { motion } from "framer-motion";
import Logo from '../assets/images/Logo';
import Input from '../assets/components/Input';
import Button from '../assets/components/Button';
import { ReactComponent as Email } from '../assets/images/email.svg';
import { ReactComponent as Password } from '../assets/images/password.svg';
import { ReactComponent as Username } from '../assets/images/username.svg';

export default function SplashScreen() {

  return (
    <>
      <motion.div className='py-20 justify-center grid' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
        <Logo height="320" />
        <form action="/action_page.php" className=' formContainer'>
          <Input type='text' id="email" placeholder='Email' image={<Email />} />
          <Input type='text' id="username" placeholder='Username' image={<Username />} />
          <Input type='password' id="password" placeholder='Password' image={<Password />} />
          <Button value='CREATE ACCOUNT' />
        </form>
      </motion.div>

    </>

  );

};