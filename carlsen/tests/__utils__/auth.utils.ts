import { Page } from '@playwright/test';
import { Server } from 'socket.io';

interface LoginOptions {
  username: string;
  server: Server;
}
export async function login(page: Page, options: LoginOptions) {
  const { username, server } = options;

  await new Promise<void>((resolve, reject) => {
    page.on('dialog', async (dialog) => {
      const type = dialog.type();
      if (type === 'prompt') {
        await dialog.accept(username);
        new Promise<void>((resolve) => {
          server.on('connection', (socket) => {
            if (socket.handshake.auth.username === username) resolve();
          });
        })
          .then(resolve)
          .catch(reject);
      } else if (type === 'alert') {
        reject(dialog.message());
      }
    });
    page.click('text=Login');
  });
}
