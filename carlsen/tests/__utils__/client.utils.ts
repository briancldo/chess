import { io, Socket } from 'socket.io-client';
import { PORT, TEST_USER_NAME } from '../../mockServer/config';

export function initClient(username: string = TEST_USER_NAME) {
  return io(`ws://localhost:${PORT}`, {
    autoConnect: false,
    auth: { username },
    reconnectionDelay: 1000,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ['websocket'],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false,
  });
}

export async function connectWait(socket: Socket) {
  if (socket.connected) return socket;
  return new Promise<typeof socket>((resolve, reject) => {
    socket.on('connect', () => resolve(socket));
    socket.on('connect_error', (err) => {
      reject(`connection error: ${err}`);
    });
    socket.connect();
  });
}

export async function disconnectWait(socket: Socket) {
  if (!socket.connected) return;
  await new Promise<void>((resolve) => {
    socket.on('disconnect', () => resolve());
    socket.disconnect();
  });
}
