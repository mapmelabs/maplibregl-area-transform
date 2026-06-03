import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        coverage: {
            provider: 'v8',
            // Print the report to the console (table + summary).
            reporter: ['text', 'text-summary'],
            // Report on all source files, not only those touched by a test.
            all: true,
            include: ['src/**/*.ts'],
            exclude: ['src/**/*.test.ts', 'src/**/*.d.ts'],
        },
    },
});
