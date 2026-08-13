import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['projects/**/*.spec.ts', 'projects/**/*.test.ts'],
    coverage: {
      provider: 'c8',
      reporter: ['text', 'lcov'],
      reportsDirectory: 'coverage',
      lines: 80,
      functions: 80,
      branches: 75,
      statements: 80,
    },
  },
});
