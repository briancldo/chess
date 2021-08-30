import { v4 as uuidv4 } from 'uuid';

import userCache from '../cache/user';
import { AuthError } from '../utils/errors';
import { IoMiddleware } from './types';

export const validateUsername: IoMiddleware = (socket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) return next(new AuthError('Username is required.'));
  if (userCache.usernameExists(username))
    return next(new AuthError('Username is taken.'));

  const userId = uuidv4();
  socket.handshake.auth.userId = userId;
  userCache.set({ username, id: userId });

  next();
};
