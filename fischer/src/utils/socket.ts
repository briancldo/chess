import { Socket } from 'socket.io';

import { SessionId, UserId, Username } from '../cache/user/types';
import { SocketAuth } from '../io.types';

interface AugmentedSocket extends Socket {
  user: {
    username: Username;
    id: UserId;
    sessionId: SessionId;
  };
}

// TODO: fix! It says socket.join() is not a function!
export function augmentSocket(socket: Socket) {
  const { username, userId, sessionId } = socket.handshake.auth;

  return {
    ...socket,
    user: {
      id: userId,
      username,
      sessionId,
    },
  } as AugmentedSocket;
}

export function extractAuthInfo(socket: Socket) {
  return socket.handshake.auth as SocketAuth;
}
