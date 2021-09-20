import { idCache, nameCache, sessionCache } from './instance';
import { getById } from './get';
import { MatchInfo, UserId, UserInfo } from './types';

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

export function updateConnectionId(userId: UserId, connectionId: string) {
  const userInfo = getById(userId);
  if (!userInfo) return;
  userInfo.connectionId = connectionId;
  set(userInfo);
}

export function addMatchInfo(id: UserId, matchInfo: MatchInfo) {
  const userInfo = getById(id);
  if (!userInfo) return;
  userInfo.match = matchInfo;
  set(userInfo);
}

export function removeMatchInfo(id: UserId) {
  const userInfo = getById(id);
  if (!userInfo) return;
  delete userInfo.match;
  set(userInfo);
}
