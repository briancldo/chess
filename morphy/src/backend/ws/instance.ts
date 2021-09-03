import { io } from 'socket.io-client';
import config from '../../config/config';
import { addSessionListener } from './session';
import { addAlertListener } from './utils';

const websocketUrl = config.get('WEBSOCKET_URL');

const socket = io(websocketUrl, { autoConnect: false, forceNew: true });
addSessionListener(socket);
if (process.env.NODE_ENV !== 'production') addAlertListener(socket);

export { socket };
