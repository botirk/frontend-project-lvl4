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
    <div ref={ref} className="d-flex flex-column justify-content-between p-2 gap-2">
      <div className="row overflow-y-auto">
        <div className="col-sm-2 overflow-y-auto h-100">
          <Channels />
        </div>
        <div className="col-sm-10 overflow-y-auto h-100">
          <Messages />
        </div>
      </div>
      <Input />
    </div>
  );
};

export default Chat;
