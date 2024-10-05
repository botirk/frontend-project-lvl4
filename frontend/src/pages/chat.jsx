import { useEffect, useRef } from 'react';
import { makeFullScreen } from '../utils';

import useSocket from '../socket';
import Channels from '../components/channels';
import Messages, { Input } from '../components/messages';

const Chat = () => {
  const ref = useRef();
  useEffect(() => { if (ref.current) makeFullScreen(ref.current); });
  useSocket();

  return <div ref={ref} className="d-flex flex-column justify-content-between p-2">
    <div>
      <div className="row">
        <div className="col-sm-2">
          <Channels />
        </div>
        <div className="col-sm-10">
          <Messages />
        </div>
      </div>
    </div>
    <Input />
  </div>;
};

export default Chat;