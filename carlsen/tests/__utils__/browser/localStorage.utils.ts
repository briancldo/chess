import { Page } from '@playwright/test';

async function getLocalStorage(page: Page) {
  const storage = (await page.context().storageState()).origins.pop()
    ?.localStorage;
  if (!storage) throw new Error('No localStorage.');
  return storage;
}

export async function localStorageGet(page: Page, key: string) {
  const storage = await getLocalStorage(page);
  const entry = storage.find((entry) => entry.name === key);
  if (!entry) return null;

  return JSON.parse(entry.value);
}
