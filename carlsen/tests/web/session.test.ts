/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect, newIncognitoPage } from '../__utils__/playwright.utils';
import waitForExpect from 'wait-for-expect';

import { TEST_USER_NAME } from '../../mockServer/config';
import { login, logout } from '../__utils__/auth.utils';
import { localStorageGet } from '../__utils__/browser/localStorage.utils';

test.describe('session#', () => {
  test('can use taken username once previous user logs out', async ({
    page,
    browser,
    io,
  }) => {
    await page.goto('/');
    const incognitoPage = await newIncognitoPage(browser, '/');

    const socket = await login(page, {
      username: TEST_USER_NAME,
      server: io.server,
    });
    await logout(page, { socket });
    await expect(
      login(incognitoPage, { username: TEST_USER_NAME, server: io.server })
    ).resolves.not.toThrow();
  });

  test('user disconnects when leaving page @flaky', async ({ page, io }) => {
    await page.goto('/');

    await login(page, {
      username: TEST_USER_NAME,
      server: io.server,
    });
    const userId = (await localStorageGet(page, 'chessapp-user')).state.userId;
    expect(userId).toBeDefined();

    await page.close();

    await waitForExpect(async () => {
      const socketsInRoom = await io.server.in(userId).allSockets();
      expect(socketsInRoom.size).toBe(0);
    });
  });

  test('user joins room corresponding to their userId @flaky', async ({
    page,
    io,
  }) => {
    await page.goto('/');

    await expect((await io.server.allSockets()).size).toBe(0);
    await login(page, {
      username: TEST_USER_NAME,
      server: io.server,
    });
    const userId = (await localStorageGet(page, 'chessapp-user')).state.userId;
    expect(userId).toBeDefined();

    await waitForExpect(async () => {
      const socketsInRoom = await io.server.in(userId).allSockets();
      expect(socketsInRoom.size).toBe(1);
    });
  });

  test('session persistents across refreshes @flaky', async ({ page, io }) => {
    await page.goto('/');

    await login(page, {
      username: TEST_USER_NAME,
      server: io.server,
    });
    const userId = (await localStorageGet(page, 'chessapp-user')).state.userId;
    expect(userId).toBeDefined();
    await page.reload({ waitUntil: 'networkidle' });

    await waitForExpect(async () => {
      const socketsInRoom = await io.server.in(userId).allSockets();
      expect(socketsInRoom.size).toBeGreaterThanOrEqual(1);
    });
  });

  test('session persistents across new tabs @flaky', async ({
    page,
    browser,
    io,
  }) => {
    await page.goto('/');

    await login(page, {
      username: TEST_USER_NAME,
      server: io.server,
    });
    const userId = (await localStorageGet(page, 'chessapp-user')).state.userId;
    expect(userId).toBeDefined();

    const context = page.context();
    const newPage = await browser.newPage({
      storageState: await context.storageState(),
    });
    if (!newPage) throw new Error('No browser for new page.');
    await newPage.goto('/');

    await waitForExpect(async () => {
      const socketsInRoom = await io.server.in(userId).allSockets();
      expect(socketsInRoom.size).toBe(2);
    });
  });
});
