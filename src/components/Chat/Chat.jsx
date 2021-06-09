import React from 'react';
import { useSelector } from 'react-redux';
import Messages from './Messages.jsx';
import Input from './Input.jsx';

export default () => {
  const currentChannelId = useSelector((state) => state.currentChannelId.id);

  return (
    <>
      <Messages currentChannelId={currentChannelId} />
      <Input currentChannelId={currentChannelId} />
    </>
  );
};
