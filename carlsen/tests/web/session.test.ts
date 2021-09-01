import { test, expect, newIncognitoPage } from '../__utils__/playwright.utils';
import { TEST_USER_NAME } from '../../mockServer/config';
import { login, logout } from '../__utils__/auth.utils';

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
});
