import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 10000 },
  
  use: {
    baseURL: 'https://academybugs.com/find-bugs/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    waitForLoadState: 'networkidle',
    actionTimeout: 10000
  },

  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    ['allure-playwright', {
      detail: true,
      outputFolder: 'allure-results',
      suiteTitle: true,
      categories: [
        {
          name: 'Critical bugs',
          matchedStatuses: ['failed'],
          matchedResultStatuses: ['failed']
        },
        {
          name: 'Visual bugs',
          matchedStatuses: ['failed'],
          messageRegex: '.*visual.*'
        }
      ]
    }]
  ],

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
  ],

  fullyParallel: false,
  workers: 1,
  retries: 2,
  retries: process.env.CI ? 2 : 0,

});