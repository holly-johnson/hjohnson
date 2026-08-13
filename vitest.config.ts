import { defineConfig } from 'vitest/config';
import fs from 'fs';
import path from 'path';

function inlineResourcesPlugin() {
  return {
    name: 'vite:angular-inline-resources',
    enforce: 'pre',
    transform(code: string, id: string) {
      if (!id.endsWith('.ts')) return null;
      if (!/templateUrl|styleUrls/.test(code)) return null;
      const dir = path.dirname(id);
      // inline templateUrl
      let out = code.replace(/templateUrl\s*:\s*['"](.+?)['"]/g, (_, p) => {
        const file = path.resolve(dir, p);
        try {
          const content = fs.readFileSync(file, 'utf8').replace(/`/g, '\\`');
          return `template: ` + '`' + content + '`';
        } catch (e) {
          return `template: ''`;
        }
      });
      // inline styleUrls
      const styleMatch = out.match(/styleUrls\s*:\s*\[([^\]]*)\]/);
      if (styleMatch) {
        const items = styleMatch[1];
        const re = /['"]([^'"]+)['"]/g;
        const styles: string[] = [];
        let m: RegExpExecArray | null;
        while ((m = re.exec(items))) {
          const file = path.resolve(dir, m[1]);
          try {
            const content = fs.readFileSync(file, 'utf8').replace(/`/g, '\\`');
            styles.push('`' + content + '`');
          } catch (e) {
            styles.push('`' + '' + '`');
          }
        }
        out = out.replace(/styleUrls\s*:\s*\[([^\]]*)\]/, `styles: [${styles.join(',')}]`);
      }
      return { code: out, map: null };
    },
  };
}

export default defineConfig({
  plugins: [inlineResourcesPlugin()],
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
