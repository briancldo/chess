import { test, expect } from '../__utils__/playwright.utils';

import { TEST_USER_NAME } from '../../mockServer/config';

test.describe('setup', () => {
  test('correct env', async ({ page }) => {
    await page.goto('/');
    const env = await page.innerText('#env');
    expect(env).toBe('e2e');
  });

  test('test client is connected to test server', async ({
    io: { client, server },
  }) => {
    expect(client.connected).toBe(true);
    expect(client.id).not.toBeUndefined();

    const socket = server.of('/').sockets.get(client.id);
    expect(socket).not.toBeUndefined();
    expect(socket?.handshake.auth.username).toBe(TEST_USER_NAME);
  });
});
