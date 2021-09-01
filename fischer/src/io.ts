import http from 'http';
import { Server } from 'socket.io';

import { establishSession } from './middleware/user';
import { addE2eUtils } from './middleware/e2e';
import userCache from './cache/user';
import { createLogger } from './utils/logger';
import { augmentSocket } from './utils/socket';
import { isE2E } from './utils/env';

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

const mockCache: any = {};

interface EventsOptions {
  verbose?: boolean;
}
function addEvents(io: Server, options?: EventsOptions) {
  const { verbose = true } = options || {};
  const logger = createLogger({ verbose });

  addMiddleware(io);

  io.on('connection', (_socket) => {
    const socket = augmentSocket(_socket);
    const { username, id, sessionId } = socket.user;
    logger(`connecting: ${id}; username: ${username}`);

    mockCache.setConnectionStatus(id, true);
    socket.join(id);
    socket.emit('session', { sessionId, userId: id });

    socket.on('ping', (callback) => {
      console.log('got pinged!');
      callback('pong');
    });

    socket.on('disconnect', async () => {
      logger(`disconnected: ${id}; username: ${username}`);

      const matchingSockets = await io.in(id).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        mockCache.setConnectionStatus(id, false);
      }
    });

    socket.on('logout', async () => {
      await io.in(id).disconnectSockets(true);
      userCache.removeById(id);
    });
  });
}

function addMiddleware(io: Server) {
  if (isE2E()) io.use(addE2eUtils);
  io.use(establishSession);
}
