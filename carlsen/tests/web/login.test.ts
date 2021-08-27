import { test, expect } from '../__utils__/playwright.utils';
import { TEST_USER_NAME } from '../../mockServer/config';
import { Socket } from 'socket.io';
import { sleep } from '../__utils__/time.utils';

test.describe('login', () => {
  test('login creates socket connection', async ({ page, io }) => {
    await page.goto('/');

    await new Promise<void>((resolve) => {
      page.on('dialog', async (dialog) => {
        await dialog.accept(TEST_USER_NAME);
        await sleep(0.1);
        const sockets = Object.fromEntries(io.server.of('/').sockets);
        const socketIds = Object.keys(sockets);
        expect(socketIds.length).toBe(1);

        const clientId = socketIds[0] as string;
        const client = sockets[clientId] as Socket;
        expect(client.handshake.auth.username).toBe(TEST_USER_NAME);
        resolve();
      });
      page.click('text=Login');
    });
  });
});
