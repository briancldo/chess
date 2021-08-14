import { Server } from 'socket.io';
import http from 'http';

import config from './config/config';
import { addEvents } from './io';

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

addEvents(io);

export { io };
