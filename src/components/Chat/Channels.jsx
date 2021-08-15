import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelAdd from './ChannelAdd.jsx';
import Channel from './Channel.jsx';
import socketAbstraction from '../../socketAbstraction.js';
import * as channelsActions from '../../slices/channels.js';

const Channels = ({ className }) => {
  // state subscribe + dispatch
  const channels = useSelector((state) => state.channels);
  const currentChannelId = useSelector((state) => state.currentChannelId.id);
  // network update
  const dispatch = useDispatch();
  useEffect(() => {
    socketAbstraction().onRenameChannel[0] = (name, id) => (
      dispatch(channelsActions.rename({ name, id }))
    );
    socketAbstraction().onRemoveChannel[0] = (id) => (
      dispatch(channelsActions.remove({ id }))
    );
    socketAbstraction().onNewChannel[0] = (name, removable, id) => (
      dispatch(channelsActions.add({ name, removable, id }))
    );
  });
  // render
  return (
    <div className={className}>
      <ChannelAdd channels={channels} />
      <div className="channels overflow-auto">
        {channels.allIds.map((id) => (
          <Channel
            key={id}
            channel={channels.byId[id]}
            channels={channels}
            isActive={id === currentChannelId}
          />
        ))}
      </div>
    </div>
  );
};
Channels.displayName = 'Channels';
export default Channels;
