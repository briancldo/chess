// eslint-disable-next-line node/no-unpublished-import
import { io, Socket } from 'socket.io-client';
import config from '../../../config/config';

const websocketPort = config.get('WEBSOCKET_PORT');
let sockets: { [id: string]: Socket } = {};

export function connect() {
  const socket = io(`ws://localhost:${websocketPort}`, { autoConnect: false });
  return new Promise<Socket>((resolve) => {
    socket.on('connect', () => {
      sockets[socket.id] = socket;
      resolve(socket);
    });
    socket.connect();
  });
}

export function disconnect(socket: Socket) {
  delete sockets[socket.id];
  return new Promise<Socket>((resolve) => {
    socket.on('disconnect', () => resolve(socket));
    socket.disconnect();
  });
}

export async function disconnectAll() {
  await Promise.all(Object.values(sockets).map((socket) => disconnect(socket)));
  sockets = {};
}

export function initialize(socket: Socket, username: string) {
  return new Promise<Socket>((resolve, reject) => {
    socket.emit(
      'initialization',
      username,
      (status: string, reason?: string) => {
        if (status === 'success') resolve(socket);
        reject(reason);
      }
    );
  });
}
