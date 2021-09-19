import { Dialog, Page } from '@playwright/test';
import { Server, Socket } from 'socket.io';

interface LoginOptions {
  username: string;
  server: Server;
}
export async function login(page: Page, options: LoginOptions) {
  const { username, server } = options;

  return new Promise<Socket>((resolve, reject) => {
    page.once('dialog', async (dialog) => {
      // login dialog
      await dialog.accept(username);
      const failureDialogHandler = async (dialog: Dialog) => {
        await dialog.accept();
        reject(new Error(dialog.message()));
      };
      server.on('connection', (socket) => {
        if (socket.handshake.auth.username === username) {
          page.removeListener('dialog', failureDialogHandler);
          resolve(socket);
        }
      });

      // failure dialog
      page.once('dialog', failureDialogHandler);
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
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    socket.on('disconnect', () => resolve());
    page.click('text=Logout', { noWaitAfter: true });
  });
}
