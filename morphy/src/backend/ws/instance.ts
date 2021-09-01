import { io } from 'socket.io-client';
import config from '../../config/config';
import { addSessionListener } from './session';

const websocketUrl = config.get('WEBSOCKET_URL');

const socket = io(websocketUrl, { autoConnect: false });
addSessionListener(socket);

export { socket };
