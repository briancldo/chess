// File should never be imported outside of the "user" directory (test files are an exception)

import NodeCache from 'node-cache';
import { UserCacheById, UsernameCache, SessionCache } from './types';

export const idCache: UserCacheById = new NodeCache();
export const nameCache: UsernameCache = new NodeCache();
export const sessionCache: SessionCache = new NodeCache();
