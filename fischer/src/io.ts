import http from 'http';
import { Server } from 'socket.io';

import { validateUsername } from './middleware/user';

export function createServer(port: number) {
  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      // TODO: restrict to specific origins
      origin: '*',
    },
  });

  addEvents(io);
  server.listen(port);
  return io;
}

function addEvents(io: Server) {
  io.use(validateUsername);

  io.on('connection', (socket) => {
    const { username } = socket.handshake.auth;
    console.log(`connecting: ${socket.id}; username: ${username}`);

    socket.on('ping', (callback) => {
      console.log('got pinged!');
      callback('pong');
    });

    socket.on('disconnecting', () => {
      console.log(`disconnecting: ${socket.id}; username: ${username}`);
    });
  });
}
