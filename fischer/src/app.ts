import { Server } from 'socket.io';
import http from 'http';

import config from './config/config';
import { AuthError } from './utils/errors';
import { AugmentedSocket, PreAugmentedSocket } from './app.types';

const websocketPort = process.env.PORT || config.get('WEBSOCKET_PORT');
const server = http.createServer();
server.listen(websocketPort);
console.log(`listening on port ${websocketPort}`);

const io = new Server(server, {
  cors: {
    // TODO: restrict to specific origins
    origin: '*',
  },
});

io.use((socket: PreAugmentedSocket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) return next(new AuthError('Username is required.'));

  socket.username = username;
  next();
});

io.on('connection', (_socket) => {
  const socket = _socket as AugmentedSocket;
  console.log(`connecting: ${socket.id}; username: ${socket.username}`);

  socket.on('ping', (callback) => {
    console.log('got pinged!');
    callback('pong');
  });

  socket.on('disconnecting', () => {
    console.log(`disconnecting: ${socket.id}; username: ${socket.username}`);
  });
});

export { io };
