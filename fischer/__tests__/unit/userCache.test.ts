import NodeCache from 'node-cache';
import cache from '../../src/cache/user';
import { UserInfo } from '../../src/cache/user/types';

describe('user cache', () => {
  // cache is cleared between tests (declared in setupTests.ts)

  const id = 'id123';
  const username = 'user123';
  const sessionId = 'session123';
  const userInfo: UserInfo = { id, username, sessionId, connected: true };

  test('#get', () => {
    cache.set(userInfo);

    const userInfoFromId = cache.getById(id);
    const userInfoFromUsername = cache.getByUsername(username);
    const userInfoFromSessionId = cache.getBySessionId(sessionId);

    expect(userInfoFromId).toEqual(userInfo);
    expect(userInfoFromUsername).toEqual(userInfo);
    expect(userInfoFromSessionId).toEqual(userInfo);
    expect(cache.getId(username)).toBe(id);
    expect(cache.getUsername(id)).toBe(username);
  });

  test('#exists', () => {
    expect(cache.usernameExists(username)).toBe(false);
    expect(cache.existsByUsername(username)).toBe(false);
    expect(cache.existsbyId(id)).toBe(false);

    cache.set(userInfo);

    expect(cache.usernameExists(username)).toBe(true);
    expect(cache.existsByUsername(username)).toBe(true);
    expect(cache.existsbyId(id)).toBe(true);
  });

  test('#count', () => {
    cache.set({ id: '1', username: 'u1', sessionId: 's1', connected: true });
    cache.set({ id: '2', username: 'u2', sessionId: 's2', connected: true });
    cache.set({ id: '3', username: 'u3', sessionId: 's3', connected: true });

    expect(getTrueCacheSize()).toBe(3);

    cache.set({ id: '4', username: 'u4', sessionId: 's4', connected: true });
    cache.set({ id: '5', username: 'u5', sessionId: 's5', connected: true });

    expect(getTrueCacheSize()).toBe(5);
  });

  test('#remove', () => {
    cache.set({ id: '1', username: 'u1', sessionId: 's1', connected: true });
    cache.set({ id: '2', username: 'u2', sessionId: 's2', connected: true });
    cache.set({ id: '3', username: 'u3', sessionId: 's3', connected: true });
    cache.set({ id: '4', username: 'u4', sessionId: 's4', connected: true });
    cache.set({ id: '5', username: 'u5', sessionId: 's5', connected: true });

    expect(cache.existsbyId('5')).toBe(true);
    cache.removeById('5');
    expect(getTrueCacheSize()).toBe(4);
    expect(cache.existsbyId('5')).toBe(false);

    expect(cache.existsByUsername('u2')).toBe(true);
    cache.removeByUsername('u2');
    expect(getTrueCacheSize()).toBe(3);
    expect(cache.existsByUsername('u2')).toBe(false);
  });

  test('#clear', () => {
    cache.set({ id: '1', username: 'u1', sessionId: 's1', connected: true });
    cache.set({ id: '2', username: 'u2', sessionId: 's2', connected: true });
    cache.set({ id: '3', username: 'u3', sessionId: 's3', connected: true });
    cache.set({ id: '4', username: 'u4', sessionId: 's4', connected: true });
    cache.set({ id: '5', username: 'u5', sessionId: 's5', connected: true });

    expect(getTrueCacheSize()).toBe(5);
    cache.clear();
    expect(getTrueCacheSize()).toBe(0);
  });
});

function getTrueCacheSize() {
  const partialCaches = require('../../src/cache/user/instance');
  expect(Object.keys(partialCaches).length).toBeGreaterThan(0);

  const cacheSizes = [cache.count()];
  for (const cache of Object.values(partialCaches) as NodeCache[]) {
    cacheSizes.push(cache.stats.keys);
  }

  const cacheSizesSet = new Set(cacheSizes);
  expect(cacheSizesSet.size).toBe(1);
  return cacheSizes.pop();
}
