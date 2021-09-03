import { Socket } from 'socket.io-client';
import { socket } from './instance';

export function ping() {
  socket.emit('ping', console.log);
}

export function addAlertListener(socket: Socket) {
  socket.on('alert', (message) => alert(message));
}
