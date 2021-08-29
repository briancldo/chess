import userCache from '../cache/user';
import { IoMiddleware } from './types';

export const addE2eUtils: IoMiddleware = (socket, next) => {
  if (process.env.NODE_ENV !== 'e2e') return next();

  if (socket.handshake.auth.username === 'clear-cache') {
    userCache.clear();
    next(new Error('cache cleared'));
  }
  next();
};
