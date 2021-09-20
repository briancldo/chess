import http from 'http';
import { Server } from 'socket.io';

import { establishSession } from './middleware/user';
import { addE2eUtils } from './middleware/e2e';
import { isE2E } from './utils/env';
import addConnectionEvent from './events/connection';

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
  addMiddleware(io);
  addConnectionEvent(io);
}

function addMiddleware(io: Server) {
  if (isE2E()) io.use(addE2eUtils);
  io.use(establishSession);
}
