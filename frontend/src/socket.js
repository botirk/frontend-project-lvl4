import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import messagesApi from "./redux/messages";
import channelsApi from "./redux/channels";

const useSocket = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const socket = io();
    socket.on('newMessage', (payload) => { // => { body: "new message", channelId: 7, id: 8, username: "admin" }
      dispatch(messagesApi.util.updateQueryData('getMessages', undefined, (messages) => {
        messages.ids.push(payload.id);
        messages.entities[payload.id] = payload;
      }));
    });
    socket.on('newChannel', (payload) => { // { id: 6, name: "new channel", removable: true }
      dispatch(channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        channels.ids.push(payload.id);
        channels.entities[payload.id] = payload;
      }))
    });

    return () => socket.disconnect();
  });
};

export default useSocket;