import { defineConfig } from "@playwright/test";

const prefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  workers: 2,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    baseURL: "http://127.0.0.1:4173",
    reducedMotion: "reduce",
    trace: "retain-on-failure",
    // Optional local override; CI uses Playwright's installed Chromium.
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : undefined
  },
  webServer: {
    command: "node scripts/serve-export.mjs",
    url: `http://127.0.0.1:4173${prefix}/`,
    reuseExistingServer: !process.env.CI
  }
});
