import { Socket } from 'socket.io-client';
import useUserStore from '../../store/user';

export interface SessionInfo {
  sessionId: string;
  userId: string;
}

export function addSessionListener(socket: Socket) {
  socket.on('session', (sessionInfo: SessionInfo) => {
    useUserStore.getState().setSessionInfo(sessionInfo);
  });
}
