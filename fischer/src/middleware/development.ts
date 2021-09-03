import { Socket } from 'socket.io';

export function addDevListeners(socket: Socket) {
  if (process.env.NODE_ENV !== 'development') return;

  socket.on('sendAlert', (to, message) => {
    const reqId = Math.random();

    console.log(`${reqId}: sending "${message}" to ${to}`);
    socket.to(to).emit('alert', message);
    console.log(`${reqId}: sent`);
  });
}
