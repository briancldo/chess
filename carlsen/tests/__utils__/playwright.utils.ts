import { test as base, expect } from '@playwright/test';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

import { initClient, connectWait, disconnectWait } from './client.utils';
import initServer from '../../mockServer/initServer';

interface TestFixtures {
  io: {
    client: Socket;
    server: Server;
  };
}

export const test = base.extend<TestFixtures>({
  io: async ({ baseURL }, use) => {
    const server = initServer();
    const client = initClient();
    await use({ server, client });
    await disconnectWait(client);
    await server.close();
  },
});

export { expect };
