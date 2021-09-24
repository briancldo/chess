import userCache from '../cache/user';
import { EventAdder } from './types';

const addMoveEvents: EventAdder = (io, socket) => {
  socket.on('move', ({ origin, destination, toUsername }) => {
    const toUserId = userCache.getId(toUsername);
    if (!toUserId) return;

    socket.to(toUserId).emit('move', { origin, destination });
  });
};
export default addMoveEvents;
