import http from 'http';
import { Server } from 'socket.io';

import { establishSession } from './middleware/user';
import { addE2eUtils } from './middleware/e2e';
import userCache from './cache/user';
import { createLogger } from './utils/logger';
import { isE2E } from './utils/env';
import { addDevListeners } from './middleware/development';
import { UserId } from './cache/user/types';

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

  addMiddleware(io);

  io.on('connection', (socket) => {
    const { username, userId: id, sessionId } = socket.handshake.auth;
    logger(`connecting: ${id}; username: ${username}`);
    addDevListeners(socket);

    userCache.setConnectionStatus(id, true);
    socket.join(id);
    socket.emit('session', { sessionId, userId: id });

    socket.on('ping', (callback) => {
      console.log('got pinged!');
      callback('pong');
    });

    socket.on('challenge', (challengee, callback) => {
      if (typeof challengee !== 'string') return callback('userNotFound');
      if (challengee === username) return callback('userNotFound');
      if (!userCache.existsByUsername(challengee))
        return callback('userNotFound');

      const challengeeId = userCache.getId(username) as UserId;
      socket.to(challengeeId).emit('challenge');
    });

    socket.on('disconnect', async () => {
      logger(`disconnected: ${id}; username: ${username}`);

      const matchingSockets = await io.in(id).allSockets();
      const isDisconnected = matchingSockets.size === 0;
      if (isDisconnected) {
        userCache.setConnectionStatus(id, false);
      }
    });

    socket.on('logout', async () => {
      await io.in(id).disconnectSockets();
      userCache.removeById(id);
    });
  });
}

function addMiddleware(io: Server) {
  if (isE2E()) io.use(addE2eUtils);
  io.use(establishSession);
}
