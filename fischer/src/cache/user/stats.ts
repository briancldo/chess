import { idCache } from './instance';

export function count() {
  return idCache.stats.keys;
}
