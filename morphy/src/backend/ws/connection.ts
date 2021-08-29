import { socket } from './instance';
import { Username } from '../../store/user';

export async function connect(username: Username) {
  socket.auth = { username };

  await new Promise<void>((resolve, reject) => {
    socket.on('connect', resolve);
    socket.on('connect_error', reject);
    socket.connect();
  });
}

export function disconnect() {
  socket.disconnect();
}
