import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import userCache from '../cache/user';
import { SessionId, UserInfo, Username } from '../cache/user/types';
import { AuthError } from '../utils/errors';
import { IoMiddleware } from './types';

export const establishSession: IoMiddleware = (socket, next) => {
  const { username, sessionId } = socket.handshake.auth;
  const userInfo = sessionId ? userCache.getBySessionId(sessionId) : null;
  if (sessionId && userInfo) {
    reEstablishSession(socket, sessionId, userInfo);
  } else {
    try {
      createNewSession(socket, { username });
    } catch (error) {
      return next(error as Error);
    }
  }

  next();
};

function reEstablishSession(
  socket: Socket,
  sessionId: SessionId,
  userInfo: UserInfo
) {
  const { id, username } = userInfo;

  socket.handshake.auth.sessionId = sessionId;
  socket.handshake.auth.userId = id;
  socket.handshake.auth.username = username;

  userCache.updateConnectionId(id, socket.id);
}

function createNewSession(
  socket: Socket,
  providedUserInfo: { username: Username }
) {
  validateUsername(socket);

  const userId = uuidv4();
  const sessionId = uuidv4();
  socket.handshake.auth.userId = userId;
  socket.handshake.auth.sessionId = sessionId;

  const userInfo: UserInfo = {
    ...providedUserInfo,
    id: userId,
    sessionId,
    connectionId: socket.id,
    connected: false,
  };

  userCache.set(userInfo);
}

const validateUsername = (socket: Socket) => {
  const { username } = socket.handshake.auth;

  if (!username) throw new AuthError('Username is required.');
  if (userCache.usernameExists(username))
    throw new AuthError('Username is taken.');
};
