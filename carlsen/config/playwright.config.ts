import { PlaywrightTestConfig } from '@playwright/test';
import projects from './projects';

const FRONTEND_PORT = 3001;

const config: PlaywrightTestConfig = {
  testDir: '../tests',
  webServer: {
    command: 'yarn start:web',
    port: FRONTEND_PORT,
    timeout: 15000,
    reuseExistingServer: false,
    env: {
      REACT_APP_E2E: 'true',
      PORT: `${FRONTEND_PORT}`,
    },
  },
  workers: 1,
  grepInvert: process.env.FLAKY ? [] : [/@flaky/],
  retries: process.env.FLAKY ? 4 : 2,
  forbidOnly: !!process.env.CI,
  use: {
    baseURL: `http://localhost:${FRONTEND_PORT}`,
    video: process.env.CI ? 'off' : 'retain-on-failure',
  },
  projects,
};
export default config;
