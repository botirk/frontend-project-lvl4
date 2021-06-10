import React from 'react';
import { useSelector } from 'react-redux';
import Messages from './Messages.jsx';
import Input from './Input.jsx';

const Chat = () => {
  const currentChannelId = useSelector((state) => state.currentChannelId.id);

  return (
    <>
      <Messages currentChannelId={currentChannelId} />
      <Input currentChannelId={currentChannelId} />
    </>
  );
};
Chat.displayName = 'Chat';
export default Chat;
