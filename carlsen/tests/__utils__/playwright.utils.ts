import { test as base, expect, Browser } from '@playwright/test';

import { initClient, disconnectWait } from './client.utils';
import initServer from '../../mockServer/initServer';
import userCache from '../__utils__/cache/user';

/* eslint-disable @typescript-eslint/no-unused-vars */
export const test = base.extend({
  page: async ({ page }, use) => {
    const server = initServer();
    const client = initClient();
    await userCache.clear();
    await use(page);
    await disconnectWait(client);
    server.close();
  },
});
/* eslint-enable @typescript-eslint/no-unused-vars */

export { expect };

export async function newIncognitoPage(browser: Browser, url: string) {
  const incognitoContext = await browser.newContext();
  const incognitoPage = await incognitoContext.newPage();
  await incognitoPage.goto(url);
  return incognitoPage;
}
