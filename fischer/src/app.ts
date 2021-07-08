import { Server } from 'socket.io';

import * as cache from './cache';

const io = new Server({
  cors: {
    // TODO: restrict to specific origins
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log(`connecting: ${socket.id}`);
  cache.addConnectionId(socket.id);

  socket.on('disconnecting', () => {
    console.log(`disconnecting: ${socket.id}`);
    cache.removeConnectionId(socket.id);
  });
});

io.listen(5000);
