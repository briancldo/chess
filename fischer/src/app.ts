import { Server } from 'socket.io';
import http from 'http';

import * as cache from './cache/user';
import config from './config/config';

const websocketPort = process.env.PORT || config.get('WEBSOCKET_PORT');
const server = http.createServer();
server.listen(websocketPort);
console.log(`listening on port ${websocketPort}`);

const io = new Server(server, {
  cors: {
    // TODO: restrict to specific origins
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`connecting: ${socket.id}`);

  socket.on('ping', (callback) => {
    console.log('got pinged!');
    callback('pong');
  });

  socket.on('initialization', (username: string, callback) => {
    try {
      cache.addUser(username, { connectionId: socket.id });
      callback('success');
    } catch (error) {
      callback('error', error.message);
    }
  });

  socket.on('disconnecting', () => {
    console.log(`disconnecting: ${socket.id}`);
    cache.removeUserByConnectionId(socket.id);
  });
});

export { io };
