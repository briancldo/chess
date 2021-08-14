import { PlaywrightTestConfig, devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  use: {
    baseURL: 'http://localhost:3000',
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chrome Stable',
      use: {
        browserName: 'chromium',
        channel: 'chrome',
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Desktop Safari',
      use: {
        browserName: 'webkit',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'Mobile Chrome',
      use: {
        browserName: 'chromium',
        ...devices['Pixel 5'],
      },
    },
    {
      name: 'Mobile Safari',
      use: {
        browserName: 'webkit',
        ...devices['iPhone 12'],
      },
    },
  ],
};
export default config;
