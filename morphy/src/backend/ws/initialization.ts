import { promptLogin } from '../../utils/user/login/auth';
import { socket } from './instance';
import { Username } from '../../store/user';

export function initialize(username: Username) {
  socket.emit('initialization', username, initializationErrorHandler);
}

type InitializationStatus = 'success' | 'error';
type InitializationErrorReason = 'username-taken' | 'connection-id-taken';
function initializationErrorHandler(
  status: InitializationStatus,
  reason?: InitializationErrorReason
) {
  console.log({ status, reason });
  if (status === 'success') return;

  if (reason === 'connection-id-taken') return;
  if (reason === 'username-taken')
    promptLogin({ message: 'Username is taken.' });
}
