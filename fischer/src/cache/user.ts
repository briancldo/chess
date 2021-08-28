import NodeCache from 'node-cache';

import { UserInfo } from './types/user';

const cache = new NodeCache();

function set(username: string, userInfo: UserInfo) {
  cache.set(username, userInfo);
}

function exists(username: string) {
  return cache.has(username);
}

function remove(username: string) {
  return cache.del(username);
}

export default {
  set,
  exists,
  remove,
};
