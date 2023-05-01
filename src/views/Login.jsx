import React, { useState, useEffect } from 'react';
import Logo from '../assets/images/Logo';
import Input from '../assets/components/Input';
import Button from '../assets/components/Button';
import { ReactComponent as Password } from '../assets/images/password.svg';
import { ReactComponent as Username } from '../assets/images/username.svg';

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
      <div className='text-center py-5 container '>
        <Logo height="320" />
        <form action="/action_page.php" className=' formContainer'>
          <Input type='text' id="fname" placeholder='Username' image={<Username />} />
          <Input type='password' id="lname" placeholder='Password' image={<Password />} />
          <Button value='LOGIN' />
        </form>
        <div className='flex-row justify-content-center d-flex gap-5'>
          <a href='/signup'>Create Account</a>
          <a href='/recoverpassword'>Forgot Password?</a>
        </div>


      </div>

      <style>
        {`

          .formContainer {
            margin-top: 2%;
          }
          

    `}

      </style>
    </>


  );

};

