import { PlaywrightTestConfig } from '@playwright/test';
import projects from './projects';

const config: PlaywrightTestConfig = {
  testDir: '../tests',
  webServer: {
    command: 'yarn --cwd .. start:web:dev',
    port: 3000,
    timeout: 15000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:3000',
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  projects,
};
export default config;
