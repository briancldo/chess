import { Socket } from 'socket.io';

import userCache from '../cache/user';
import { extractAuthInfo } from '../utils/socket';

export function associateUserWithSession(socket: Socket) {
  const { userId: id, sessionId } = extractAuthInfo(socket);

  userCache.setConnectionStatus(id, true);
  socket.join(id);
  socket.emit('session', { sessionId, userId: id });
}
