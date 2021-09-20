import http from 'http';
import { Server } from 'socket.io';

import { establishSession } from './middleware/user';
import { addE2eUtils } from './middleware/e2e';
import userCache from './cache/user';
import { isE2E } from './utils/env';
import { addDevListeners } from './middleware/postConnection/development';
import { extractAuthInfo } from './utils/socket';
import logger from './utils/logger';

import addChallengeEvents from './events/challenge';
import addDisconnectEvents from './events/disconnect';
import addDebugEvents from './events/debug';
import { associateUserWithSession } from './middleware/postConnection/session';

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

  io.on('connection', (socket) => {
    const { username, userId: id } = extractAuthInfo(socket);
    logger(`connecting: ${id}; username: ${username}`);

    // post-connection middleware
    addDevListeners(socket);
    associateUserWithSession(socket);

    // events
    addDebugEvents(io, socket);
    addChallengeEvents(io, socket);
    addDisconnectEvents(io, socket);
  });
}

function addMiddleware(io: Server) {
  if (isE2E()) io.use(addE2eUtils);
  io.use(establishSession);
}
