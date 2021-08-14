import { test, expect } from '@playwright/test';

test.describe('setup', () => {
  test('correct env', async ({ page }) => {
    await page.goto('/');
    const env = await page.innerText('#env');
    expect(env).toBe('e2e');
  });
});
