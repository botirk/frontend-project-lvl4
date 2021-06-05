import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Channels from './Chat/Channels.jsx';

export default () => {
  const style = { height: '100%', padding: '1rem' }
  return <Container style={style}>
    <Row style={style}>
      <Col sm={2}>
        <Channels />
      </Col>
      <Col sm={10}>
        Hello World From Col2
      </Col>
    </Row>
  </Container>
}