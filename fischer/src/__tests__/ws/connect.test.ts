import { io } from '../../app';
import * as socket from './__utils__/socket.test.utils';
import { isConnectionIdCached } from './__utils__/cache.test.utils';

describe('connect', () => {
  afterEach(async () => {
    if (socket.isConnected()) await socket.disconnect();
  });

  afterAll(() => {
    io.close();
  });

  describe('connection', () => {
    test('adds id to cache', async () => {
      const connectedSocket = await socket.connect();
      const connectionId = connectedSocket.id;
      expect(isConnectionIdCached(connectionId)).toBe(true);
    });
  });

  describe('disconnect', () => {
    test('removes id from cache', async () => {
      const connectedSocket = await socket.connect();
      const disconnectedSocket = await socket.disconnect();

      expect(disconnectedSocket.id).toBe(connectedSocket.id);
      expect(isConnectionIdCached(disconnectedSocket.id)).toBe(false);
    });
  });
});

// TODO: add testing to CI
