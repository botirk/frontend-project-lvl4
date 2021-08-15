/* eslint-disable functional/no-let, no-use-before-define, no-console */
import { io } from 'socket.io-client';

let forcedSocket;
export const forceSocket = (socket) => {
  forcedSocket = socket;
  // because it lets new abstraction to be created
  abstraction = undefined;
};

let abstraction;
export default () => {
  if (abstraction !== undefined) return abstraction;
  const socket = forcedSocket ?? io();
  // abstraction functions
  abstraction = {
    newMessage(username, body, channelId) {
      const newMessage = { username, body, channelId };
      socket.emit('newMessage', newMessage);
    },
    onNewMessage: [],
    newChannel(name) {
      socket.emit('newChannel', { name });
    },
    onNewChannel: [],
    removeChannel(id) {
      socket.emit('removeChannel', { id });
    },
    onRemoveChannel: [],
    renameChannel(id, name) {
      socket.emit('renameChannel', { id, name });
    },
    onRenameChannel: [],
  };
  // connecting socket with abstraction
  socket.on('newMessage',
    ({
      username, body, channelId, id,
    }) => abstraction.onNewMessage.forEach((cb) => cb(username, body, channelId, id)));
  socket.on('newChannel',
    ({ name, removable, id }) => abstraction.onNewChannel.forEach((cb) => cb(name, removable, id)));
  socket.on('removeChannel',
    ({ id }) => abstraction.onRemoveChannel.forEach((cb) => cb(id)));
  socket.on('renameChannel',
    ({ name, id }) => abstraction.onRenameChannel.forEach((cb) => cb(name, id)));
  // debugging information for socket
  if (process.env.NODE_ENV !== 'production' && socket.onAny !== undefined) { socket.onAny((...args) => console.log('socket.onAny', args)); }

  return abstraction;
};
