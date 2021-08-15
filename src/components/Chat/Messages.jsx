import React, { useEffect, useRef } from 'react';
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

const Messages = ({ className }) => {
  const currentChannelId = useSelector((state) => state.currentChannelId.id);
  const messages = useSelector((state) => state.messages.byChannelId[currentChannelId] ?? []);
  const dispatch = useDispatch();
  const messagesEl = useRef(null);
  useEffect(() => {
    socketAbstraction()
      .onNewMessage[0] = (username, body, channelId, id) => dispatch(messagesActions.add({
        username, body, channelId, id,
      }));
    // scroll to bottom
    messagesEl.current.scrollTop = messagesEl.current.scrollHeight;
  });

  return (
    <ListGroup className={className} ref={messagesEl}>
      {messages.map((message) => <Message key={message.id} message={message} />)}
    </ListGroup>
  );
};
Messages.displayName = 'Messages';
export default Messages;
