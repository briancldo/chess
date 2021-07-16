import { io } from '../../app';
import * as socketUtils from './__utils__/socket.test.utils';
import { isConnectionIdCached } from './__utils__/cache/connectionCache.test.utils';
import * as userCache from './__utils__/cache/userCache.test.utils';
import { sleep } from './__utils__/time.utils';

const testUsername = 'brido';

describe('connect', () => {
  afterEach(async () => {
    await socketUtils.disconnectAll();
    userCache.remove(testUsername);
  });

  afterAll(() => {
    io.close();
  });

  describe('initialization', () => {
    test('adds username and id to cache', async () => {
      const socket = await socketUtils.connect();
      const connectionId = socket.id;
      await socketUtils.initialize(socket, testUsername);

      expect(userCache.get(testUsername)).toEqual({ connectionId });
      expect(isConnectionIdCached(connectionId)).toBe(true);
    });

    test('rejects if username exists', async () => {
      const socket1 = await socketUtils.connect();
      await socketUtils.initialize(socket1, testUsername);

      const socket2 = await socketUtils.connect();
      await expect(socketUtils.initialize(socket2, testUsername)).rejects.toBe(
        'username-taken'
      );
    });

    test('rejects if connection id exists', async () => {
      const socket = await socketUtils.connect();
      await socketUtils.initialize(socket, testUsername);

      await expect(
        socketUtils.initialize(socket, `${testUsername}2`)
      ).rejects.toBe('connection-id-taken');
    });
  });

  describe('disconnect', () => {
    test('removes username and id from cache', async () => {
      const socket = await socketUtils.connect();
      const connectionId = socket.id;
      await socketUtils.initialize(socket, testUsername);
      await socketUtils.disconnect(socket);

      await sleep(0.15);
      expect(isConnectionIdCached(connectionId)).toBe(false);
      expect(userCache.get(testUsername)).toBeUndefined();
    });
  });
});
