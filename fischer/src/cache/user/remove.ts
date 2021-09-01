import { nameCache, idCache, sessionCache } from './instance';
import { getById, getByUsername } from './get';

export function removeById(id: string) {
  const { username, sessionId } = getById(id) || {};
  if (username) nameCache.del(username);
  if (sessionId) sessionCache.del(sessionId);
  idCache.del(id);
}

export function removeByUsername(username: string) {
  const { id } = getByUsername(username) || {};
  if (id) removeById(id);
}

export function clear() {
  idCache.flushAll();
  nameCache.flushAll();
  sessionCache.flushAll();
}
