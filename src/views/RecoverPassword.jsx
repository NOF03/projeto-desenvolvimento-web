import React from 'react';
import { motion } from "framer-motion";
import Logo from '../assets/images/Logo';
import Input from '../assets/components/Input';
import Button from '../assets/components/Button';
import { ReactComponent as Email } from '../assets/images/email.svg';

export default function SplashScreen() {

  return (
    <>
      <motion.div className='py-20 justify-center grid' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 2 }}>
        <Logo height="320" />
        <form action="/action_page.php" className=' formContainer'>
          <Input type='text' id="email" placeholder='Email' image={<Email />} />
          <Button value='SEND RECOVERY EMAIL' />
        </form>
      </motion.div>

    </>

  );

};