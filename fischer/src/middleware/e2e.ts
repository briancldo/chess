import userCache from '../cache/user';
import { isE2E } from '../utils/env';
import { IoMiddleware } from './types';

export const addE2eUtils: IoMiddleware = (socket, next) => {
  if (!isE2E()) return next();

  if (socket.handshake.auth.username === 'clear-cache') {
    userCache.clear();
    return next(new Error('cache cleared'));
  }
  next();
};
