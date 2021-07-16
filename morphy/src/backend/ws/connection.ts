import { initialize } from './initialization';
import { socket } from './instance';
import { Username } from '../../store/user';
import persistentStorage from '../../utils/persistentStorage';

function isSessionActive() {
  return persistentStorage.get('session-active');
}

function markSessionAsActive() {
  persistentStorage.set('session-active', true);
}

export function connect(username: Username) {
  socket.on('connect', () => {
    if (!isSessionActive()) {
      initialize(username);
      markSessionAsActive();
    }
  });
  socket.connect();
}

export function disconnect() {
  socket.disconnect();
}
