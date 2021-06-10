import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelAdd from './ChannelAdd.jsx';
import Channel from './Channel.jsx';
import socketAbstraction from '../../socketAbstraction.js';
import * as channelsActions from '../../slices/channels.js';

const Channels = () => {
  // state subscribe + dispatch
  const { channels, currentChannelId } = useSelector(
    (state) => ({ channels: state.channels, currentChannelId: state.currentChannelId.id }),
  );

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
    <>
      <ChannelAdd channels={channels} />
      <div style={{ overflow: 'auto', maxHeight: '60vh' }}>
        {channels.allIds.map((id) => (
          <Channel
            key={id}
            dispatch={dispatch}
            channel={channels.byId[id]}
            active={id === currentChannelId}
          />
        ))}
      </div>
    </>
  );
};
Channels.displayName = 'Channels';
export default Channels;
