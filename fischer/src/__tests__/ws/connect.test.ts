import { io } from '../../app';
import * as socketUtils from './__utils__/socket.test.utils';
import { isConnectionIdCached } from './__utils__/cache/connectionCache.test.utils';
import * as userCache from './__utils__/cache/userCache.test.utils';

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

  describe.skip('disconnect', () => {
    test('removes id from cache', async () => {
      const socket = await socketUtils.connect();
      const disconnectedSocket = await socketUtils.disconnect(socket);

      expect(disconnectedSocket.id).toBe(socket.id);
      expect(isConnectionIdCached(disconnectedSocket.id)).toBe(false);
    });
  });
});
