import NodeCache from 'node-cache';

import MatchDetails from './types';

const cache = new NodeCache();

function get(id: string) {
  return cache.get(id);
}

function set(id: string, matchDetails: MatchDetails) {
  return cache.set(id, matchDetails);
}

function remove(id: string) {
  return cache.del(id);
}

const matchCache = { get, set, remove };
export default matchCache;
