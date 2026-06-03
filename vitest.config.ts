import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            // Print the report to the console (table + summary).
            reporter: ['text', 'text-summary', 'html'],
            // Report on all source files, not only those touched by a test.
            all: true,
            include: ['src/**/*.ts'],
            exclude: ['src/**/*.test.ts', 'src/**/*.d.ts'],
        },
        // Two projects: fast node tests for pure logic, and a real browser for
        // tests that need the DOM / canvas APIs (suffixed `*.browser.test.ts`).
        projects: [
            {
                extends: true,
                test: {
                    name: 'node',
                    environment: 'node',
                    include: ['src/**/*.test.ts'],
                    exclude: ['src/**/*.browser.test.ts'],
                },
            },
            {
                extends: true,
                test: {
                    name: 'browser',
                    include: ['src/**/*.browser.test.ts'],
                    browser: {
                        enabled: true,
                        provider: playwright(),
                        headless: true,
                        instances: [{ browser: 'chromium' }],
                    },
                },
            },
        ],
    },
});
