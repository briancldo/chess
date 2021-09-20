import { Server } from 'socket.io';

import { addDevListeners } from '../middleware/postConnection/development';
import { associateUserWithSession } from '../middleware/postConnection/session';
import logger from '../utils/logger';
import { extractAuthInfo } from '../utils/socket';
import addChallengeEvents from './challenge';
import addDebugEvents from './debug';
import addDisconnectEvents from './disconnect';

export default function addConnectionEvent(io: Server) {
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
