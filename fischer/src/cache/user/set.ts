import { idCache, nameCache } from './instance';
import { UserInfo } from './types';

export function set(userInfo: UserInfo) {
  const { id, username } = userInfo;

  idCache.set(id, userInfo);
  nameCache.set(username, id);
}
