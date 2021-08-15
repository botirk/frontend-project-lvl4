import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Header from '../Header.jsx';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';
import Input from './Input.jsx';
import fillStore from './IndexLogic.js';

const Index = () => {
  // console.log('render');
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => fillStore(dispatch, history));

  return (
    <div className="d-flex flex-column justify-content-between py-2 vh-100">
      <div>
        <Header />
        <Row className="my-1">
          <Col sm={3}>
            <Channels className="my-content my-content-channels" />
          </Col>
          <Col sm={9}>
            <Messages className="my-content my-content-messages" />
          </Col>
        </Row>
      </div>
      <Input />
    </div>
  );
};
Index.displayName = 'Index';
export default Index;
