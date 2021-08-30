import http from 'http';
import { Server } from 'socket.io';

import { validateUsername } from './middleware/user';
import userCache from './cache/user';
import { createLogger } from './utils/logger';
import { isE2e } from './utils/e2e';
import { addE2eUtils } from './middleware/e2e';

export function createServer(port: number, eventsOptions?: EventsOptions) {
  const server = http.createServer();
  const io = new Server(server, {
    cors: {
      // TODO: restrict to specific origins
      origin: '*',
    },
  });

  addEvents(io, eventsOptions || {});
  server.listen(port);
  return io;
}

interface EventsOptions {
  verbose?: boolean;
}
function addEvents(io: Server, options?: EventsOptions) {
  const { verbose = true } = options || {};
  const logger = createLogger({ verbose });

  if (isE2e()) io.use(addE2eUtils);
  io.use(validateUsername);

  io.on('connection', (socket) => {
    const { username } = socket.handshake.auth;
    logger(`connecting: ${socket.id}; username: ${username}`);

    socket.on('ping', (callback) => {
      console.log('got pinged!');
      callback('pong');
    });

    socket.on('disconnecting', () => {
      logger(`disconnecting: ${socket.id}; username: ${username}`);
      userCache.removeByUsername(username);
    });
  });
}
