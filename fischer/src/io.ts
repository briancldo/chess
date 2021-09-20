import http from 'http';
import { Server } from 'socket.io';

import addConnectionEvent from './events/connection';
import { addPreConnectionMiddleware } from './middleware';

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
  addPreConnectionMiddleware(io);
  addConnectionEvent(io);
}
