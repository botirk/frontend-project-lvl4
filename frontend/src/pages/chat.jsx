/* eslint-disable
no-param-reassign */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { makeFullScreen, useWindowBig } from '../utils';
import useSocket from '../socket';
import MySidebar from '../components/sidebar';
import Messages, { Input } from '../components/messages';

const Chat = () => {
  const ref = useRef();
  useEffect(() => {
    const resize = () => {
      if (ref.current) makeFullScreen(ref.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);
  useSocket();
  const big = useWindowBig();
  const sidebar = useSelector((state) => state.chat.sidebar);

  return (
    <div ref={ref} className="d-flex">
      <MySidebar />
      {(!sidebar || big) && (
        <div className="d-flex flex-column justify-content-between h-100 w-100">
          <Messages />
          <Input />
        </div>
      )}
    </div>
  );
};

export default Chat;
