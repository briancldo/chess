import * as socketIoClient from 'socket.io-client';

const socketIo = jest.requireActual<typeof socketIoClient>('socket.io-client');

const socketInstance = socketIo.io('http://localhost:5002', {
  autoConnect: false,
});
const originalConnect = socketInstance.connect;
const originalDisconnect = socketInstance.disconnect;
socketInstance.connect = jest.fn(originalConnect);
socketInstance.disconnect = jest.fn(originalDisconnect);

export const io = jest.fn(() => {
  return socketInstance;
});
