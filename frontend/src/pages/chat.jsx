/* eslint-disable
no-param-reassign */
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { makeFullScreen, useWindowBig } from '../utils';
import useSocket from '../socket';
import MySidebar from '../components/sidebar';
import Messages from '../components/messages';
import { sidebarSelector } from '../redux/chat';

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
  const sidebar = useSelector(sidebarSelector);

  return (
    <div ref={ref} className="d-flex">
      <MySidebar />
      {(!sidebar || big) && <Messages />}
    </div>
  );
};

export default Chat;
