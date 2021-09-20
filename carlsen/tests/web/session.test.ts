/* eslint-disable sonarjs/no-duplicate-string */
import { test, expect, newIncognitoPage } from '../__utils__/playwright.utils';

import { TEST_USER_NAME } from '../../mockServer/config';
import { login, logout } from '../__utils__/auth.utils';

test.describe('session#', () => {
  test('can use taken username once previous user logs out', async ({
    page,
    browser,
  }) => {
    await page.goto('/');
    const incognitoPage = await newIncognitoPage(browser, '/');

    await login(page, { username: TEST_USER_NAME });
    await logout(page);
    await expect(
      login(incognitoPage, { username: TEST_USER_NAME })
    ).resolves.not.toThrow();
  });

  test('session persistents across refreshes @flaky', async ({ page }) => {
    await page.goto('/');
    await login(page, { username: TEST_USER_NAME });

    let loggedInText = await page.innerText('text=Logged in as:');
    expect(loggedInText).toBe(`Logged in as: ${TEST_USER_NAME}`);

    await page.reload({ waitUntil: 'networkidle' });
    loggedInText = await page.innerText('text=Logged in as:');
    expect(loggedInText).toBe(`Logged in as: ${TEST_USER_NAME}`);
  });

  test('session persistents across new tabs @flaky', async ({
    page,
    browser,
  }) => {
    await page.goto('/');
    await login(page, { username: TEST_USER_NAME });
    let loggedInText = await page.innerText('text=Logged in as:');
    expect(loggedInText).toBe(`Logged in as: ${TEST_USER_NAME}`);

    const context = page.context();
    const newPage = await browser.newPage({
      storageState: await context.storageState(),
    });
    if (!newPage) throw new Error('No browser for new page.');
    await newPage.goto('/');

    loggedInText = await page.innerText('text=Logged in as:');
    expect(loggedInText).toBe(`Logged in as: ${TEST_USER_NAME}`);
  });
});
