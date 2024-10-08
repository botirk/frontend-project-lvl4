/* eslint-disable
functional/no-expression-statement,
functional/no-conditional-statement,
no-param-reassign */
import { useEffect, useRef } from 'react';
import { makeFullScreen } from '../utils';

import useSocket from '../socket';
import Channels from '../components/channels';
import Messages, { Input } from '../components/messages';

const Chat = () => {
  const ref = useRef();
  useEffect(() => { if (ref.current) makeFullScreen(ref.current); });
  useSocket();

  return (
    <>
      <div ref={ref} className="row p-2">
        <div className="col-sm-2 overflow-y-auto">
          <Channels />
        </div>
        <div className="col-sm-10 overflow-y-auto">
          <Messages />
        </div>
      </div>
      <Input />
    </>
  );
};

export default Chat;
