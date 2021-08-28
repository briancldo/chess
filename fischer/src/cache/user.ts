import NodeCache from 'node-cache';

import { UserInfo } from './types/user';

const cache = new NodeCache();

function set(username: string, userInfo: UserInfo) {
  cache.set(username, userInfo);
}

function exists(username: string) {
  return cache.has(username);
}

export default {
  set,
  exists,
};
