import { newIncognitoPage, test, expect } from '../__utils__/playwright.utils';
import { login } from '../__utils__/auth.utils';
import {
  sendAndAcceptChallenge,
  sendAndRejectChallenge,
  sendChallengeWithError,
} from '../__utils__/challenge.utils';
import { sleep } from '../__utils__/time.utils';
import { TEST_USER_NAME } from '../../mockServer/config';

test.describe('challenge#', () => {
  test.describe('sending a challenge', () => {
    test('accepting challenge redirects both users to match page', async ({
      page,
      browser,
      baseURL,
    }) => {
      await page.goto('/');
      const incognitoPage = await newIncognitoPage(browser, '/');
      await login(page, { username: 'magnus' });
      await login(incognitoPage, { username: 'nepo' });

      await sendAndAcceptChallenge('magnus', incognitoPage, page);
      expect(page.url()).toBe(`${baseURL}/match`);
      expect(incognitoPage.url()).toBe(`${baseURL}/match`);
    });

    test('declining challenge informs challenger', async ({
      page,
      browser,
      baseURL,
    }) => {
      await page.goto('/');
      const incognitoPage = await newIncognitoPage(browser, '/');
      await login(page, { username: 'magnus' });
      await login(incognitoPage, { username: 'nepo' });

      const rejectMessage = await sendAndRejectChallenge(
        'magnus',
        incognitoPage,
        page
      );
      expect(rejectMessage).toBe('Challenge declined.');
      await sleep(0.1);
      expect(page.url()).toBe(`${baseURL}/`);
      expect(incognitoPage.url()).toBe(`${baseURL}/`);
    });

    test.describe('challenge errors', () => {
      test('challenger is alerted if user is not found', async ({ page }) => {
        await page.goto('/');
        await login(page, { username: TEST_USER_NAME });

        const errorMessage = await sendChallengeWithError('nonexistent', page);
        expect(errorMessage).toBe('User not found.');
      });

      test('challenger cannot challenge themselves', async ({ page }) => {
        await page.goto('/');
        await login(page, { username: TEST_USER_NAME });

        const errorMessage = await sendChallengeWithError(TEST_USER_NAME, page);
        expect(errorMessage).toBe('User not found.');
      });

      test('cannot challenge player already in a match', async ({
        page,
        browser,
      }) => {
        await page.goto('/');
        const nepoPage = await newIncognitoPage(browser, '/');
        const caruanaPage = await newIncognitoPage(browser, '/');
        await login(page, { username: 'magnus' });
        await login(nepoPage, { username: 'nepo' });
        await login(caruanaPage, { username: 'caruana' });

        await sendAndAcceptChallenge('magnus', nepoPage, page);
        const errorMessage = await sendChallengeWithError(
          'magnus',
          caruanaPage
        );
        expect(errorMessage).toBe('User is currently in a match.');
      });
    });
  });
});
