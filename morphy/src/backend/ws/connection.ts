import { io } from 'socket.io-client';
import { clearSocketInstance, initializeSocket } from './instance';
import config from '../../config/config';

const websocketUrl = config.get('WEBSOCKET_URL');

export function connect() {
  initializeSocket(io(websocketUrl));
}

export function disconnect() {
  clearSocketInstance();
}
