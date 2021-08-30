import cache from '../../src/cache/user';
import { UserInfo } from '../../src/cache/types/user';

describe('user cache', () => {
  // cache is cleared between tests (declared in setupTests.ts)
  const id = 'id123';
  const username = 'user123';
  const userInfo: UserInfo = { id, username };

  test('#get', () => {
    cache.set(userInfo);

    const userInfoFromId = cache.getById(id);
    const userInfoFromUsername = cache.getByUsername(username);

    expect(userInfoFromId).toEqual(userInfo);
    expect(userInfoFromUsername).toEqual(userInfo);
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
    cache.set({ id: '1', username: 'u1' });
    cache.set({ id: '2', username: 'u2' });
    cache.set({ id: '3', username: 'u3' });

    expect(cache.count()).toBe(3);

    cache.set({ id: '4', username: 'u4' });
    cache.set({ id: '5', username: 'u5' });

    expect(cache.count()).toBe(5);
  });

  test('#remove', () => {
    cache.set({ id: '1', username: 'u1' });
    cache.set({ id: '2', username: 'u2' });
    cache.set({ id: '3', username: 'u3' });
    cache.set({ id: '4', username: 'u4' });
    cache.set({ id: '5', username: 'u5' });

    expect(cache.existsbyId('5')).toBe(true);
    cache.removeById('5');
    expect(cache.count()).toBe(4);
    expect(cache.existsbyId('5')).toBe(false);

    expect(cache.existsByUsername('u2')).toBe(true);
    cache.removeByUsername('u2');
    expect(cache.count()).toBe(3);
    expect(cache.existsByUsername('u2')).toBe(false);
  });

  test('#clear', () => {
    cache.set({ id: '1', username: 'u1' });
    cache.set({ id: '2', username: 'u2' });
    cache.set({ id: '3', username: 'u3' });
    cache.set({ id: '4', username: 'u4' });
    cache.set({ id: '5', username: 'u5' });

    expect(cache.count()).toBe(5);
    cache.clear();
    expect(cache.count()).toBe(0);
  });
});
