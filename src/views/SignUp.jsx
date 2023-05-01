import React from 'react';
import Logo from '../assets/images/Logo';
import Input from '../assets/components/Input';
import Button from '../assets/components/Button';
import { ReactComponent as Email } from '../assets/images/email.svg';
import { ReactComponent as Password } from '../assets/images/password.svg';
import { ReactComponent as Username } from '../assets/images/username.svg';

export default function SplashScreen() {

    return (
      <>
        <div className='text-center py-5 container'>
          <Logo height="320" />
          <form action="/action_page.php" className=' formContainer'>
            <Input type='text' id="email" placeholder='Email' image={<Email />} />
            <Input type='text' id="username" placeholder='Username' image={<Username />} />
            <Input type='password' id="password" placeholder='Password' image={<Password />} />
            <Button value='CREATE ACCOUNT' />
          </form>
        </div>
    
        </>
            
    );

};