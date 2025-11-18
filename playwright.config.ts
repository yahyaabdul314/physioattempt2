import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for WebXR VR Testing
 * Tests run in real browser with WebXR API emulation
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium-vr',
      use: {
        ...devices['Desktop Chrome'],
        // Enable WebXR flags for VR testing
        launchOptions: {
          args: [
            '--enable-features=WebXR',
            '--enable-webxr',
            '--enable-webxr-incubations',
            '--enable-features=WebXRARModule',
            '--enable-features=WebXRHitTest',
            '--disable-web-security', // Allow XR without HTTPS in dev
            '--disable-features=IsolateOrigins,site-per-process',
          ],
        },
        permissions: ['xr-spatial-tracking'],
      },
    },
  ],

  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
});
