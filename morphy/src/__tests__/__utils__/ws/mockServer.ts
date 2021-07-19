// eslint-disable-next-line unicorn/prefer-node-protocol
import http from 'http';
import { Server } from 'socket.io';

const httpServer = http.createServer();
const port = 5002;
let listening = false;

const mockServer = new Server(httpServer, {
  cors: {
    origin: '*',
  },
});

export async function getMockServer() {
  if (!listening) {
    await new Promise<void>((resolve) => {
      httpServer.listen(port, () => {
        listening = true;
        resolve();
      });
    });
  }
  return mockServer;
}
