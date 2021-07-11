import { Server } from 'socket.io';
import http from 'http';
import express from 'express';
import cors from 'cors';

import * as cache from './cache';
import config from './config/config';

const app = express();
app.use(cors());

app.get('/health', (request, response) => {
  response.send('OK');
});

const server = http.createServer(app);

const io = new Server(server, {
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

const websocketPort = config.get('WEBSOCKET_PORT');
server.listen(websocketPort);
console.log(`listening on port ${websocketPort}`);

export { io };
