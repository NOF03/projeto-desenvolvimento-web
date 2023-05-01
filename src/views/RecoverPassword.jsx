import React from 'react';
import Logo from '../assets/images/Logo';
import Input from '../assets/components/Input';
import Button from '../assets/components/Button';
import { ReactComponent as Email } from '../assets/images/email.svg';

export default function SplashScreen() {

    return (
      <>
        <div className='text-center py-5 container'>
          <Logo height="320" />
          <form action="/action_page.php" className=' formContainer'>
            <Input type='text' id="email" placeholder='Email' image={<Email />} />
            <Button value='SEND RECOVERY EMAIL' />
          </form>
        </div>
    
        </>
            
    );

};