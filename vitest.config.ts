import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: 'vitest.setup.ts',
    include: ['projects/**/*.spec.ts', 'projects/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80,
    },
  },
});
