import { nameCache, idCache } from './instance';
import { getById, getByUsername } from './get';

export function removeById(id: string) {
  const { username } = getById(id) || {};
  if (username) nameCache.del(username);
  idCache.del(id);
}

export function removeByUsername(username: string) {
  const { id } = getByUsername(username) || {};
  if (id) idCache.del(id);
  nameCache.del(username);
}

export function clear() {
  idCache.flushAll();
  nameCache.flushAll();
}
