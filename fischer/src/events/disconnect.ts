import { extractAuthInfo } from '../utils/socket';
import userCache from '../cache/user';
import logger from '../utils/logger';
import { EventAdder } from './types';

const addDisconnectEvents: EventAdder = (io, socket) => {
  const { username, userId: id } = extractAuthInfo(socket);

  socket.on('disconnect', async () => {
    logger(`disconnected: ${id}; username: ${username}`);

    // TODO: if in the middle of a match, remove match and alert opponent that user has left

    const matchingSockets = await io.in(id).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (isDisconnected) {
      userCache.setConnectionStatus(id, false);
    }
  });

  socket.on('logout', async () => {
    await io.in(id).disconnectSockets();
    userCache.removeById(id);
  });
};
export default addDisconnectEvents;
