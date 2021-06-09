import React, { useEffect } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import socketAbstraction from '../../socketAbstraction.js';
import * as messagesActions from '../../slices/messages.js';

const Message = ({ message }) => (
  <ListGroup.Item>
    <b>{message.username}</b>
    :
    {message.body}
  </ListGroup.Item>
);

const style = { overflow: 'auto', height: '74vh' };
export default ({ currentChannelId }) => {
  const messages = useSelector((state) => state.messages.byChannelId[currentChannelId] ?? []);
  const dispatch = useDispatch();
  useEffect(() => {
    socketAbstraction()
      .onNewMessage[0] = (username, body, channelId, id) => dispatch(messagesActions.add({
        username, body, channelId, id,
      }));
  });

  return (
    <ListGroup style={style}>
      {messages.map((message) => <Message key={message.id} message={message} />)}
    </ListGroup>
  );
};
