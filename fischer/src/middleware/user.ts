import { Socket } from 'socket.io';
import { v4 as uuidv4 } from 'uuid';

import userCache from '../cache/user';
import { SessionId, UserInfo, Username } from '../cache/user/types';
import { AuthError } from '../utils/errors';
import { IoMiddleware } from './types';

export const establishSession: IoMiddleware = (socket, next) => {
  const { username, sessionId } = socket.handshake.auth;
  const userInfo = sessionId ? userCache.getBySessionId(sessionId) : null;
  console.log({ sessionId, userInfo });
  if (sessionId && userInfo) {
    reEstablishSession(socket, sessionId, userInfo);
  } else {
    try {
      createNewSession(socket, { username });
    } catch (error) {
      return next(error);
    }
  }

  next();
};

const validateUsername = (socket: Socket) => {
  const { username } = socket.handshake.auth;

  if (!username) throw new AuthError('Username is required.');
  if (userCache.usernameExists(username))
    throw new AuthError('Username is taken.');
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
  providedUserInfo: { username: Username }
) {
  validateUsername(socket);

  const userId = uuidv4();
  const sessionId = uuidv4();
  socket.handshake.auth.userId = userId;
  socket.handshake.auth.sessionId = sessionId;

  const userInfo = {
    ...providedUserInfo,
    id: userId,
    sessionId,
    connected: false,
  };

  userCache.set(userInfo);
}
