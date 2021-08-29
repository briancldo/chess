import { Socket } from 'socket.io';
import { test, expect, newIncognitoPage } from '../__utils__/playwright.utils';
import { TEST_USER_NAME } from '../../mockServer/config';
import { sleep } from '../__utils__/time.utils';
import { login } from '../__utils__/auth.utils';

test.describe('login', () => {
  test('login creates socket connection', async ({ page, io }) => {
    await page.goto('/');

    await login(page, { username: TEST_USER_NAME, server: io.server });
    await sleep(0.1);
    const sockets = Object.fromEntries(io.server.of('/').sockets);
    const socketIds = Object.keys(sockets);
    expect(socketIds.length).toBe(1);

    const clientId = socketIds[0] as string;
    const client = sockets[clientId] as Socket;
    expect(client.handshake.auth.username).toBe(TEST_USER_NAME);
  });

  test('new user can login with different username', async ({
    page,
    browser,
    io,
  }) => {
    await page.goto('/');
    const incognitoPage = await newIncognitoPage(browser, '/');

    await login(page, { username: TEST_USER_NAME, server: io.server });
    expect(
      login(incognitoPage, {
        username: `${TEST_USER_NAME}2`,
        server: io.server,
      })
    ).resolves.not.toThrow();
  });

  test('cannot login with taken username', async ({ page, browser, io }) => {
    await page.goto('/');
    const incognitoPage = await newIncognitoPage(browser, '/');

    await login(page, { username: TEST_USER_NAME, server: io.server });
    expect(
      login(incognitoPage, { username: TEST_USER_NAME, server: io.server })
    ).rejects.toThrow('Error logging in: Username is taken.');
  });
});
