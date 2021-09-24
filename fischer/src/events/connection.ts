import { Server } from 'socket.io';
import { addPostConnectionMiddleware } from '../middleware';

import logger from '../utils/logger';
import { extractAuthInfo } from '../utils/socket';
import addChallengeEvents from './challenge';
import addDebugEvents from './debug';
import addDisconnectEvents from './disconnect';
import addMoveEvents from './move';

export default function addConnectionEvent(io: Server) {
  io.on('connection', (socket) => {
    const { username, userId: id } = extractAuthInfo(socket);
    logger(`connecting: ${id}; username: ${username}`);

    addPostConnectionMiddleware(socket);
    // events
    addDebugEvents(io, socket);
    addChallengeEvents(io, socket);
    addMoveEvents(io, socket);
    addDisconnectEvents(io, socket);
  });
}
