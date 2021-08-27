import config from './config/config';
import { createServer } from './io';

const websocketPort = process.env.PORT || config.get('WEBSOCKET_PORT');
const server = createServer(websocketPort);
console.log(`listening on port ${websocketPort}`);

export { server as io };
