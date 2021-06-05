import { io } from 'socket.io-client';

let abstraction = undefined;
export default () => {
  if (abstraction !== undefined) return abstraction;
  const socket = io();
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
  }
  // connecting socket with abstraction
  socket.on('newMessage',
    ({username, body, channelId, id}) =>
      abstraction.onNewMessage.forEach((cb) => cb(username, body, channelId, id)));
  socket.on('newChannel',
    ({name, removable, id}) =>
      abstraction.onNewChannel.forEach((cb) => cb(name, removable, id)));
  socket.on('removeChannel',
    ({id}) =>
      abstraction.onRemoveChannel.forEach((cb) => cb(id)));
  // debugging information for socket
  if (process.env.NODE_ENV !== 'production')
    socket.onAny((...args) => console.log('socket.onAny',args));

  return abstraction;
}