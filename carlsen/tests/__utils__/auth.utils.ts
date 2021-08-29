import { Page } from '@playwright/test';
import { Server } from 'socket.io';
import { Socket } from 'socket.io-client';

interface LoginOptions {
  username: string;
  server: Server;
}
export async function login(page: Page, options: LoginOptions) {
  const { username, server } = options;

  return new Promise<Socket>((resolve, reject) => {
    page.on('dialog', async (dialog) => {
      const type = dialog.type();
      if (type === 'prompt') {
        await dialog.accept(username);
        server.on('connection', (socket) => {
          if (socket.handshake.auth.username === username)
            resolve(socket as unknown as Socket);
        });
      } else if (type === 'alert') {
        reject(dialog.message());
      }
    });
    page.click('text=Login');
  });
}

interface LogoutOptions {
  socket: Socket;
}
export async function logout(page: Page, options: LogoutOptions) {
  const { socket } = options;

  // eslint-disable-next-line no-async-promise-executor
  await new Promise<void>(async (resolve) => {
    page.on('dialog', async (dialog) => {
      await dialog.accept();
    });
    socket.on('disconnect', () => resolve());
    page.click('text=Logout', { noWaitAfter: true });
  });
}
