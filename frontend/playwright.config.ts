import { defineConfig, devices } from '@playwright/test';

const CI = !!process.env.CI;

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  timeout: 30_000,
  retries: CI ? 1 : 0,
  reporter: CI ? 'github' : 'list',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },

  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],

  webServer: [
    {
      command: 'go run ./cmd/server',
      cwd: '../backend',
      port: 8080,
      timeout: 30_000,
      reuseExistingServer: !CI,
      env: {
        PORT: '8080',
        DB_PATH: './test.db',
        ALLOWED_ORIGIN: 'http://localhost:5173',
      },
    },
    {
      command: 'npm run dev',
      port: 5173,
      timeout: 30_000,
      reuseExistingServer: !CI,
      env: {
        PUBLIC_API_URL: 'http://localhost:8080',
        PUBLIC_WS_URL: 'ws://localhost:8080',
      },
    },
  ],
});
