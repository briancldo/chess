import { socket } from './instance';

export function connect() {
  socket.connect();
}

export function disconnect() {
  socket.disconnect();
}
