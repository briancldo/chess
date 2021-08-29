import { Page } from '@playwright/test';
import { sleep } from './time.utils';

interface LoginOptions {
  username: string;
}
export async function login(page: Page, { username }: LoginOptions) {
  await new Promise<void>((resolve, reject) => {
    page.on('dialog', async (dialog) => {
      const type = dialog.type();
      if (type === 'prompt') {
        await dialog.accept(username);
        sleep(0.1).then(resolve).catch(reject);
      } else if (type === 'alert') {
        reject(dialog.message());
      }
    });
    page.click('text=Login');
  });
}
