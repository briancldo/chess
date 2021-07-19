import * as userCache from '../../../../cache/user';

export function get(username: string) {
  return userCache.getUser(username);
}

export function remove(username: string) {
  userCache.removeUser(username);
}
