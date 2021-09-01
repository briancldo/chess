import { idCache, nameCache, sessionCache } from './instance';
import { getById } from './get';
import { UserId, UserInfo } from './types';

export function set(userInfo: UserInfo) {
  const { id, username, sessionId } = userInfo;

  idCache.set(id, userInfo);
  nameCache.set(username, id);
  sessionCache.set(sessionId, id);
}

export function setConnectionStatus(id: UserId, status: boolean) {
  const userInfo = getById(id);
  if (!userInfo) return;
  userInfo.connected = status;
  set(userInfo);
}
