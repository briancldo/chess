import { useEffect } from 'react';
import { connect } from '../../../backend/ws/connection';
import { socket } from '../../../backend/ws/instance';
import useUserStore from '../../../store/user';

export function useReconnect() {
  useEffect(() => {
    const { isLoggedIn, username, sessionId } = useUserStore.getState();
    const isConnectedToSocket = socket.connected;

    if (isLoggedIn && !isConnectedToSocket) {
      connect(username, sessionId);
    }
  }, []);
}
