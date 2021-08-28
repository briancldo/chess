import userCache from '../cache/user';
import { AuthError } from '../utils/errors';
import { IoMiddleware } from './types';

export const validateUsername: IoMiddleware = (socket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) return next(new AuthError('Username is required.'));
  if (userCache.exists(username)) {
    return next(new AuthError('Username is taken.'));
  }
  userCache.set(username, { username });

  next();
};
