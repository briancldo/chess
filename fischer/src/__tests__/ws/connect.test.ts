import { io } from '../../app';
import { AugmentedSocket } from '../../app.types';
import * as socketUtils from './__utils__/socket.test.utils';

const testUsername = 'brido';

describe('connect', () => {
  afterEach(async () => {
    await socketUtils.disconnectAll();
  });

  afterAll(() => {
    io.close();
  });

  describe('connection', () => {
    test('connects user with username', async () => {
      const socket = await socketUtils.connect({ username: testUsername });
      const connectedSocket = io
        .of('/')
        .sockets.get(socket.id) as AugmentedSocket;
      expect(connectedSocket.username).toBe(testUsername);
    });

    test('error if no username is passed', async () => {
      const connectNoUsername = socketUtils.connect({
        username: undefined as unknown as string,
      });
      await expect(connectNoUsername).rejects.toThrow('Username is required.');
    });
  });
});
