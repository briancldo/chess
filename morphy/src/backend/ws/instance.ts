import { io } from 'socket.io-client';
import config from '../../config/config';

const websocketUrl = config.get('WEBSOCKET_URL');

export const socket = io(websocketUrl, { autoConnect: false });
