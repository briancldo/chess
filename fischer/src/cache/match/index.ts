import NodeCache from 'node-cache';

import { MatchDetails } from './types';

const cache = new NodeCache();

function get(id: string) {
  return cache.get<MatchDetails>(id);
}

function set(id: string, matchDetails: MatchDetails) {
  return cache.set(id, matchDetails);
}

function remove(id: string) {
  return cache.del(id);
}

function clear() {
  return cache.flushAll();
}

const matchCache = { get, set, remove, clear };
export default matchCache;
