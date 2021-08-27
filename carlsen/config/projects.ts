import {
  devices,
  PlaywrightTestArgs,
  PlaywrightWorkerArgs,
  Project,
} from '@playwright/test';

const projectsCI = [
  {
    name: 'Desktop Chrome',
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
];

const projectsLocal = [
  {
    name: 'Desktop Chrome',
    use: {
      browserName: 'chromium',
      channel: 'chrome',
    },
  },
  {
    name: 'Mobile Chrome',
    use: {
      browserName: 'chromium',
      ...devices['Pixel 5'],
    },
  },
];

const projects: Project<PlaywrightTestArgs, PlaywrightWorkerArgs>[] = process
  .env.CI
  ? projectsCI
  : projectsLocal;
export default projects;
