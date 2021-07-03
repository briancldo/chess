import { Server } from 'socket.io';

const io = new Server({
  cors: {
    origin: ['*'],
  },
});

io.on('connection', (socket) => {
  socket.on('message', ({ sender, message }) => {
    console.log(`${sender} said ${message}`);
    socket.broadcast.emit('message', `${sender}: ${message}`);
  });
});

io.listen(5000);
