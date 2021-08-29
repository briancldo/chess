import { test as base, expect, Browser } from '@playwright/test';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

import { initClient, disconnectWait } from './client.utils';
import initServer from '../../mockServer/initServer';
// eslint-disable-next-line node/no-unpublished-import
import userCache from '../../../fischer/src/cache/user';

interface TestFixtures {
  io: {
    client: Socket;
    server: Server;
  };
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export const test = base.extend<TestFixtures>({
  io: async ({ baseURL }, use) => {
    const server = initServer();
    const client = initClient();
    await use({ server, client });
    await disconnectWait(client);
    await server.close();
    userCache.clear();
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
