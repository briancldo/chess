import { promptLogin } from '../../utils/user/login/auth';
import { socket } from './instance';
import { Username } from '../../store/user';

export function initialize(username: Username) {
  socket.emit('initialization', username, initializationErrorHandler);
}

export type InitializationStatus = 'success' | 'error';
export type InitializationErrorReason =
  | 'username-taken'
  | 'connection-id-taken';
function initializationErrorHandler(
  status: InitializationStatus,
  reason?: InitializationErrorReason
) {
  if (status === 'success') return;

  if (reason === 'connection-id-taken') return;
  if (reason === 'username-taken')
    promptLogin({ message: 'Username is taken.' });
}
