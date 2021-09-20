import { Server, Socket } from 'socket.io';

import { isE2E } from '../utils/env';
import { addE2eUtils } from './preConnection/e2e';
import { addDevListeners } from './postConnection/development';
import { associateUserWithSession } from './postConnection/session';
import { establishSession } from './preConnection/user';

export function addPreConnectionMiddleware(io: Server) {
  if (isE2E()) io.use(addE2eUtils);
  io.use(establishSession);
}

export function addPostConnectionMiddleware(socket: Socket) {
  addDevListeners(socket);
  associateUserWithSession(socket);
}
