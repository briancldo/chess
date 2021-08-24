import { Server } from 'socket.io';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line node/no-unpublished-import
import { createServer } from '../../fischer/src/io';
import { PORT } from './config';
import { UserMap } from './types/initServer.types';

process.env.SERVER_PORT = PORT.toString();

export default function initServer() {
  // type hack; createServer does return a Server, TS just doesn't like how it's imported
  const io = createServer(PORT) as unknown as Server;

  io.on('connection', (socket) => {
    socket.on('users', () => {
      const users: UserMap = {};
      for (const [id, socket] of io.of('/').sockets) {
        users[id] = { id, username: socket.handshake.auth.username };
      }

      socket.emit('users', users);
    });
  });

  return io;
}
