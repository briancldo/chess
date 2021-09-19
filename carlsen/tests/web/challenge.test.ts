import { newIncognitoPage, test, expect } from '../__utils__/playwright.utils';
import { login } from '../__utils__/auth.utils';
import {
  sendAndAcceptChallenge,
  sendAndRejectChallenge,
} from '../__utils__/challenge.utils';
import { sleep } from '../__utils__/time.utils';

test.describe('challenge#', () => {
  test.describe('sending a challenge', () => {
    test('accepting challenge redirects both users to match page', async ({
      page,
      browser,
      baseURL,
      io,
    }) => {
      await page.goto('/');
      const incognitoPage = await newIncognitoPage(browser, '/');
      await login(page, { username: 'magnus', server: io.server });
      await login(incognitoPage, { username: 'nepo', server: io.server });

      await sendAndAcceptChallenge('magnus', incognitoPage, page);
      await sleep(0.1);
      expect(page.url()).toBe(`${baseURL}/match`);
      expect(incognitoPage.url()).toBe(`${baseURL}/match`);
    });

    test('declining challenge informs challenger', async ({
      page,
      browser,
      baseURL,
      io,
    }) => {
      await page.goto('/');
      const incognitoPage = await newIncognitoPage(browser, '/');
      await login(page, { username: 'magnus', server: io.server });
      await login(incognitoPage, { username: 'nepo', server: io.server });

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
  });
});
