// export const socketInstance = {
//   connect: jest.fn(() => {
//     socketInstance.connected = true;
//   }),
//   disconnect: jest.fn(() => {
//     socketInstance.connected = false;
//   }),
//   connected: false,
// };

// export const io = jest.fn(() => {
//   return socketInstance;
// });

import * as socketIoClient from 'socket.io-client';

const socketIo = jest.requireActual<typeof socketIoClient>('socket.io-client');

const socketInstance = socketIo.io();
const originalConnect = socketInstance.connect;
const originalDisconnect = socketInstance.disconnect;
socketInstance.connect = jest.fn(originalConnect);
socketInstance.disconnect = jest.fn(originalDisconnect);

export const io = jest.fn(() => {
  return socketInstance;
});
