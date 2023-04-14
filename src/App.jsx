import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { ReactComponent as Logo } from './assets/logo.svg'


export default function App() {

  return (

    <>

      <Container className='text-center'>
        <Row>
          <Col>1 of 4</Col>
          <Logo />
          <Col>2 of 4</Col>
          <Col>3 of 4</Col>
          <Col>4 of 4</Col>
        </Row>
      </Container>


      <style>
        {`
    .container {
      background-color: purple;
      color: white;
    }

    .btn-xxl {
      padding: 1rem 1.5rem;
      font-size: 1.5rem;
    }
    `}
      </style>
    </>


  );

};

