import { Server } from 'socket.io';

import * as cache from './cache';
import config from './config/config';

const io = new Server({
  cors: {
    // TODO: restrict to specific origins
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`connecting: ${socket.id}`);
  cache.addConnectionId(socket.id);

  socket.on('ping', (callback) => {
    console.log('got pinged!');
    callback('pong');
  });

  socket.on('disconnecting', () => {
    console.log(`disconnecting: ${socket.id}`);
    cache.removeConnectionId(socket.id);
  });
});

const websocketPort = 80; // config.get('WEBSOCKET_PORT');
io.listen(websocketPort);
console.log(`listening on port ${websocketPort}`);

export { io };
