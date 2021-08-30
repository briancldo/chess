import { idCache, nameCache } from './instance';

export function getById(id: string) {
  return idCache.get(id);
}

export function getId(username: string) {
  return nameCache.get(username);
}

export function getByUsername(username: string) {
  const userId = nameCache.get(username);
  if (userId == null) return;
  return getById(userId);
}

export function getUsername(id: string) {
  const user = idCache.get(id);
  return (user || {}).username;
}
