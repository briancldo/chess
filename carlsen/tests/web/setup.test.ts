import { test, expect } from '../__utils__/playwright.utils';

import { TEST_USER_NAME } from '../../mockServer/config';
import { connectWait } from '../__utils__/client.utils';

test.describe('setup', () => {
  test('correct env', async ({ page }) => {
    await page.goto('/');
    const env = await page.innerText('#env');
    expect(env).toBe('e2e');
  });

  test('test client is connected to test server', async ({ io }) => {
    await connectWait(io.client);
    expect(io.client.connected).toBe(true);
    expect(io.client.id).not.toBeUndefined();

    const socket = io.server.of('/').sockets.get(io.client.id);
    expect(socket).not.toBeUndefined();
    expect(socket?.handshake.auth.username).toBe(TEST_USER_NAME);
  });
});
