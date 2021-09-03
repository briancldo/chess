import { idCache, nameCache } from './instance';
import { getByUsername } from './get';

export function existsbyId(id: string) {
  return idCache.has(id);
}

export function existsByUsername(username: string) {
  const { id } = getByUsername(username) || {};
  if (!id) return false;
  return existsbyId(id);
}

export function usernameExists(username: string) {
  return nameCache.has(username);
}
