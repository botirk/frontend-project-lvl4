import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ChannelAdd from './ChannelAdd.jsx';
import Channel from './Channel.jsx';
import socketAbstraction from '../../socketAbstraction.js';
import * as channelsActions from '../../slices/channels.js';


export default () => {
  // state subscribe + dispatch
  const { channels, currentChannelId } 
    = useSelector((state) => ({ channels: state.channels, currentChannelId: state.currentChannelId.id }));
  const dispatch = useDispatch();
  // network update
  socketAbstraction().onNewChannel[0] = 
    (name, removable, id) => dispatch(channelsActions.add({ name, removable, id }));
  //render
  return <>
    <ChannelAdd channels={channels} />
    {channels.allIds.map((id) => <Channel 
      key={id} 
      channel={channels.byId[id]}  
      currentChannelId={currentChannelId}
    />)}
  </>
}