import { initialize } from './initialization';
import { socket } from './instance';
import useUserStore, { Username } from '../../store/user';

function shouldInitialize() {
  return !useUserStore.getState().isLoggedIn;
}

export function connect(username: Username) {
  socket.on('connect', () => {
    if (!shouldInitialize()) {
      initialize(username);
    }
  });
  socket.connect();
}

export function disconnect() {
  socket.disconnect();
}
