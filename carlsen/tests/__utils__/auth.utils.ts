import { Dialog, Page } from '@playwright/test';
import { Socket } from 'socket.io';

interface LoginOptions {
  username: string;
}
export async function login(page: Page, options: LoginOptions) {
  const { username } = options;

  return new Promise<void>((resolve, reject) => {
    page.once('dialog', async (dialog) => {
      // login dialog
      await dialog.accept(username);
      const failureDialogHandler = async (dialog: Dialog) => {
        await dialog.accept();
        reject(new Error(dialog.message()));
      };

      // failure dialog
      page.once('dialog', failureDialogHandler);
      await page.waitForSelector('text=Logged in as');
      page.removeListener('dialog', failureDialogHandler);
      resolve();
    });
    page.click('text=Login');
  });
}

export async function logout(page: Page) {
  await new Promise<unknown>((resolve, reject) => {
    page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    page.click('text=Logout', { noWaitAfter: true });

    page
      .waitForSelector('text=Logged in as', {
        state: 'detached',
      })
      .then(resolve)
      .catch(reject);
  });
}
