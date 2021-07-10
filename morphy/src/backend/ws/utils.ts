import { socket } from './instance';

export function ping() {
  socket.emit('ping', console.log);
}
