import { AuthError } from '../utils/errors';
import { IoMiddleware } from './types';

export const validateUser: IoMiddleware = (socket, next) => {
  const { username } = socket.handshake.auth;
  if (!username) return next(new AuthError('Username is required.'));

  next();
};
