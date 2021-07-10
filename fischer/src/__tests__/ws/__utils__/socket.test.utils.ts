// eslint-disable-next-line node/no-unpublished-import
import { io } from 'socket.io-client';

const socket = io('ws://localhost:5000', { autoConnect: false });
let connected = false;

export async function connect() {
  return new Promise<typeof socket>((resolve) => {
    socket.on('connect', () => {
      connected = true;
      resolve(socket);
    });
    socket.connect();
  });
}

export function disconnect() {
  return new Promise<typeof socket>((resolve) => {
    socket.on('disconnect', () => {
      connected = false;
      resolve(socket);
    });
    socket.disconnect();
  });
}

export function isConnected() {
  return connected;
}
