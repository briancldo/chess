import { Server } from 'socket.io';
import { AugmentedSocket, PreAugmentedSocket } from './app.types';
import { AuthError } from './utils/errors';

export function addEvents(io: Server) {
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
}
