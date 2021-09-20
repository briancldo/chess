import { idCache, nameCache, sessionCache } from './instance';
import { SessionId, UserId, Username } from './types';

export function getById(id: UserId) {
  return idCache.get(id);
}

export function getByUsername(username: Username) {
  const userId = nameCache.get(username);
  if (!userId) return;
  return getById(userId);
}

export function getBySessionId(sessionId: SessionId) {
  const userId = sessionCache.get(sessionId);
  if (!userId) return;
  return getById(userId);
}

export function getId(username: Username) {
  return nameCache.get(username);
}

export function getUsername(id: UserId) {
  const user = idCache.get(id);
  return (user || {}).username;
}

export function getSessionId(id: UserId) {
  const user = idCache.get(id);
  return (user || {}).sessionId;
}

export function getConnectionId(id: UserId) {
  const user = idCache.get(id);
  return (user || {}).connectionId;
}
