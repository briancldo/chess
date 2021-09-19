import { test, expect, newIncognitoPage } from '../__utils__/playwright.utils';
import { TEST_USER_NAME } from '../../mockServer/config';
import { login } from '../__utils__/auth.utils';

test.describe('login#', () => {
  test('different user can login with different username', async ({
    page,
    browser,
  }) => {
    await page.goto('/');
    const incognitoPage = await newIncognitoPage(browser, '/');

    await login(page, { username: TEST_USER_NAME });
    await expect(
      login(incognitoPage, { username: `${TEST_USER_NAME}2` })
    ).resolves.not.toThrow();
  });

  test('cannot login with taken username', async ({ page, browser }) => {
    await page.goto('/');
    const incognitoPage = await newIncognitoPage(browser, '/');

    await login(page, { username: TEST_USER_NAME });
    await expect(
      login(incognitoPage, { username: TEST_USER_NAME })
    ).rejects.toThrow('Error logging in: Username is taken.');
  });
});
