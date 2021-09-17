import { SessionId, UserId, Username } from './cache/user/types';

export interface SocketAuth {
  username: Username;
  userId: UserId;
  sessionId: SessionId;
}
