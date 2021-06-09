import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Login from '../Login.jsx';
import Channels from './Channels.jsx';
import Chat from './Chat.jsx';
import Header from '../Header.jsx';
import * as channelsActions from '../../slices/channels.js';
import * as currentChannelIdActions from '../../slices/currentChannelId.js';
import * as messagesActions from '../../slices/messages.js';

const fillStoreWithFakes = (dispatch) => {
  console.log('development: init fake messages');
  const dummyMessages = [
    {
      body: 'dummy message 1',
      channelId: 1,
      username: 'dummy author 1',
      id: 5 ** 5,
    },
    {
      body: 'Hello World! General edition!',
      channelId: 1,
      username: 'JS',
      id: 6 ** 6,
    },
    {
      body: 'dummy message 2',
      channelId: 2,
      username: 'dummy author 2',
      id: 5 ** 4,
    },
    {
      body: 'Hello World! Random edition!',
      channelId: 2,
      username: 'JS',
      id: 6 ** 5,
    },
  ];
  dummyMessages.forEach((message) => dispatch(messagesActions.add(message)));
};

const fillStore = async (dispatch, history) => {
  try {
    const JWT = Login.getJWT();
    // console.log(JWT);
    const { data } = await axios.get('/api/v1/data', { headers: { Authorization: `bearer ${JWT.token}` } });
    // console.log(data);
    dispatch(currentChannelIdActions.set(data.currentChannelId));
    dispatch(messagesActions.init({ messages: data.messages }));
    dispatch(channelsActions.init({ channels: data.channels }));
    if (data.messages.find((message) => message.channelId <= 2) === undefined && process.env.NODE_ENV !== 'production') { fillStoreWithFakes(dispatch); }
  } catch (e) {
    if (Login.isAuthError(e)) Login.handleAuthError(history);
    else console.error('fillStore:', e);
  }
};

const style = { height: '100%', padding: '1rem' };
export default () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => fillStore(dispatch, history));

  return (
    <Container style={style}>
      <Header />
      <Row style={style}>
        <Col sm={2}>
          <Channels />
        </Col>
        <Col sm={10}>
          <Chat />
        </Col>
      </Row>
    </Container>
  );
};
