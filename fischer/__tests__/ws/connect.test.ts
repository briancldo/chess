import { io } from '../../src/app';
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
      const connectedSocket = io.of('/').sockets.get(socket.id);
      expect(connectedSocket?.handshake.auth.username).toBe(testUsername);
    });

    test('error if no username is passed', async () => {
      const connectNoUsername = socketUtils.connect({
        username: undefined as unknown as string,
      });
      await expect(connectNoUsername).rejects.toThrow('Username is required.');
    });

    test('error if username exists', async () => {
      const username = testUsername;
      await socketUtils.connect({ username });
      const connectExistingUsername = socketUtils.connect({ username });
      await expect(connectExistingUsername).rejects.toThrow(
        'Username is taken.'
      );
    });

    test('username is valid once previous owner disconnects', async () => {
      const username = testUsername;
      const connection1 = await socketUtils.connect({ username });
      await socketUtils.disconnect(connection1);

      const connection2Promise = socketUtils.connect({ username });
      await expect(connection2Promise).resolves.not.toThrow();
    });
  });
});
