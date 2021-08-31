import NodeCache from 'node-cache';

export type UserId = string;
export type Username = string;
export type SessionId = string;
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
export interface UsernameCache extends NodeCache {
  set(username: Username, id: UserId): boolean;
  get(username: Username): UserId | undefined;
  has(username: Username): boolean;
  del(username: Username): number;
}

// @ts-expect-error: want to override in my own way
export interface SessionCache extends NodeCache {
  set(sessionId: SessionId, id: UserId): boolean;
  get(sessionId: SessionId): UserId | undefined;
  has(sessionId: SessionId): boolean;
  del(sessionId: SessionId): number;
}
