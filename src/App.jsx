import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';

export default function App() {
  return (
    <>
      <Container>
        <Row>
          <Col>1 of 4</Col>
          <Col>2 of 4</Col>
          <Col>3 of 4</Col>
          <Col>4 of 4</Col>
        </Row>
      </Container>
    </>
  );
};