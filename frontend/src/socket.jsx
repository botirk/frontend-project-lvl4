/* eslint-disable
no-param-reassign */
import { io } from 'socket.io-client';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

import messagesApi from './redux/messages';
import channelsApi from './redux/channels';

const useSocket = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (payload) => { // => { body: "new message", channel: 7, id: 8, username: "admin" }
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (messages) => {
        messages.ids.push(payload.id);
        messages.entities[payload.id] = payload;
      }));
    });
    socket.on('newChannel', (payload) => { // { id: 6, name: "new channel", removable: true }
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        channels.ids.push(payload.id);
        channels.entities[payload.id] = payload;
      }));
    });
    socket.on('renameChannel', (payload) => { // { id: 7, name: "new name channel", removable: true }
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        channels.entities[payload.id] = payload;
      }));
    });
    socket.on('removeChannel', (payload) => { // { id: 6 };
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        delete channels.entities[payload.id];
        const i = channels.ids.indexOf(payload.id);
        if (i >= 0) channels.ids.splice(i, 1);
      }));
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (messages) => {
        for (let i = 0; i < messages.ids.length; i += 1) { // eslint-disable-line
          const id = messages.ids[i];
          const message = messages.entities[id];
          if (message.channel === payload.id) {
            messages.ids.splice(i, 1);
            delete messages.entities[id];
            i -= 1;
          }
        }
      }));
    });

    return () => socket.disconnect();
  }, [dispatch]);
};

export default useSocket;
