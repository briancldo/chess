import http from 'http';
import { Server } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import { establishSession } from './middleware/user';
import { addE2eUtils } from './middleware/e2e';
import userCache from './cache/user';
import { createLogger } from './utils/logger';
import { isE2E } from './utils/env';
import { addDevListeners } from './middleware/development';
import { UserId } from './cache/user/types';
import matchCache from './cache/match';
import { SocketAuth } from './io.types';

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

  // eslint-disable-next-line sonarjs/cognitive-complexity
  io.on('connection', (socket) => {
    const {
      username,
      userId: id,
      sessionId,
    } = socket.handshake.auth as SocketAuth;
    logger(`connecting: ${id}; username: ${username}`);
    addDevListeners(socket);

    userCache.setConnectionStatus(id, true);
    socket.join(id);
    socket.emit('session', { sessionId, userId: id });

    socket.on('ping', (callback) => {
      console.log('got pinged!');
      callback('pong');
    });

    socket.on('challenge_request', (challengee) => {
      if (typeof challengee !== 'string')
        return socket.emit('challenge_response', 'userNotFound');
      if (challengee === username)
        return socket.emit('challenge_response', 'userNotFound');
      if (!userCache.existsByUsername(challengee))
        return socket.emit('challenge_response', 'userNotFound');
      if (userCache.getByUsername(challengee)?.match)
        return socket.emit('challenge_response', 'userInMatch');

      const challengeeId = userCache.getId(challengee) as UserId;
      console.log(
        `${username} (${id}) challenges ${challengee} (${challengeeId})`
      );
      // delay on development to give me time to switch tabs before chrome suppresses the prompt
      return setTimeout(
        () => socket.to(challengeeId).emit('challenge_request', username),
        process.env.NODE_ENV === 'development' ? 500 : 0
      );
    });

    socket.on(
      'challenge_response',
      (challengeResponseInfo: { challenger: string; accepted: boolean }) => {
        const { challenger, accepted } = challengeResponseInfo;
        const challengerId = userCache.getId(challenger);
        if (!challengerId) return;

        if (accepted) {
          const matchId = uuidv4();

          matchCache.set(matchId, { players: [id, challengerId] });
          userCache.addMatchInfo(id, { id: matchId });
          userCache.addMatchInfo(challengerId, { id: matchId });

          socket.join(matchId);
          const challengerConnId = userCache.getConnectionId(challengerId);
          if (challengerConnId)
            io.of('/').sockets.get(challengerConnId)?.join(matchId);

          socket.to(challengerId).emit('challenge_response', 'accepted', {
            matchId,
            opponent: { username },
          });
          socket.emit('challenge_response', 'accepted', {
            matchId,
            opponent: { username: challenger },
          });
        } else {
          socket.to(challengerId).emit('challenge_response', 'rejected');
        }
      }
    );

    socket.on('disconnect', async () => {
      logger(`disconnected: ${id}; username: ${username}`);

      // TODO: if in the middle of a match, remove match and alert opponent that user has left

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
