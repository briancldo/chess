// eslint-disable-next-line node/no-unpublished-import
import { io, Socket } from 'socket.io-client';
import config from '../../../src/config/config';

const websocketPort = config.get('WEBSOCKET_PORT');
let sockets: { [id: string]: Socket } = {};

interface ConnectionInfo {
  username: string;
}
export function connect(connectionInfo: ConnectionInfo) {
  const { username } = connectionInfo;
  const socket = io(`ws://localhost:${websocketPort}`, { autoConnect: false });
  return new Promise<Socket>((resolve, reject) => {
    socket.on('connect', () => {
      sockets[socket.id] = socket;
      resolve(socket);
    });
    socket.on('connect_error', (error) => {
      disconnect(socket);
      reject(error);
    });
    socket.auth = { username };
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
