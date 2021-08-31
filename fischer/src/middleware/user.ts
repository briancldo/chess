import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import userCache from '../cache/user';
import { SessionId, UserInfo } from '../cache/user/types';
import { AuthError } from '../utils/errors';
import { IoMiddleware } from './types';

const mockCache: any = {};

export const establishSession: IoMiddleware = (socket, next) => {
  validateUsername(socket, next);

  const { username, sessionId } = socket.handshake.auth;
  const userInfo = mockCache.getBySessionId(sessionId);
  if (sessionId && userInfo) reEstablishSession(socket, sessionId, userInfo);
  else createNewSession(socket, { username });

  next();
};

const validateUsername: IoMiddleware = (socket, next) => {
  const { username } = socket.handshake.auth;

  if (!username) return next(new AuthError('Username is required.'));
  if (userCache.usernameExists(username))
    return next(new AuthError('Username is taken.'));
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
}

function createNewSession(
  socket: Socket,
  providedUserInfo: Omit<UserInfo, 'id' | 'connected'>
) {
  const userId = uuidv4();
  const sessionId = uuidv4();
  socket.handshake.auth.userId = userId;
  socket.handshake.auth.sessionId = sessionId;

  const userInfo = { ...providedUserInfo, id: userId, connected: false };

  userCache.set(userInfo);
}
