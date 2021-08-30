import NodeCache from 'node-cache';

type UserId = string;
type Username = string;
export interface UserInfo {
  id: UserId;
  username: Username;
  connected: boolean;
}

// @ts-expect-error: want to override in my own way
export interface UserCacheById extends NodeCache {
  set(id: UserId, userInfo: UserInfo): boolean;
  get(id: UserId): UserInfo | undefined;
  has(id: UserId): boolean;
  del(id: UserId): number;
}

// @ts-expect-error: want to override in my own way
export interface UserCacheByUsername extends NodeCache {
  set(username: Username, id: UserId): boolean;
  get(username: Username): UserId | undefined;
  has(username: Username): boolean;
  del(username: Username): number;
}
