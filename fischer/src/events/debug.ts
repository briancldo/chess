import logger from '../utils/logger';
import { EventAdder } from './types';

const addDebugEvents: EventAdder = (io, socket) => {
  socket.on('ping', (callback) => {
    logger('got pinged!');
    callback('pong');
  });
};
export default addDebugEvents;
