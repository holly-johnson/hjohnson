import 'zone.js';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ResourceLoader } from '@angular/compiler';

// jsdom ships no matchMedia, so anything reading prefers-color-scheme throws on
// construction. ThemeService does, and Navigation injects it, so without this the
// whole app fails to render under test. Defaults to light with inert listeners.
if (typeof window !== 'undefined' && !window.matchMedia) {
  window.matchMedia = ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia;
}

// Same story for localStorage, which jsdom leaves undefined on an opaque origin.
// An in-memory stand-in keeps the saved-preference read from throwing.
if (typeof window !== 'undefined' && !window.localStorage) {
  const store = new Map<string, string>();
  Object.defineProperty(window, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => (store.has(key) ? store.get(key)! : null),
      setItem: (key: string, value: string) => void store.set(key, String(value)),
      removeItem: (key: string) => void store.delete(key),
      clear: () => store.clear(),
      key: (i: number) => [...store.keys()][i] ?? null,
      get length() {
        return store.size;
      },
    },
  });
}

// Initialize the Angular testing environment
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Preload component resources (HTML and SCSS) using Vite's glob import as raw strings.
// The keys are file paths; map them by filename to make resolution by relative URLs easier.
const htmlResources = import.meta.glob('./projects/**/src/**/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const styleResources = import.meta.glob('./projects/**/src/**/*.{css,scss,sass}', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const resourceMap = new Map<string, string>();
for (const key of Object.keys(htmlResources)) {
  resourceMap.set(key.replace(/^\.\//, ''), htmlResources[key]);
}
for (const key of Object.keys(styleResources)) {
  resourceMap.set(key.replace(/^\.\//, ''), styleResources[key]);
}

class VitestResourceLoader implements ResourceLoader {
  get(url: string): Promise<string> {
    // Try to resolve by several candidate paths: absolute project path or relative paths.
    const candidates = [url, url.replace(/^\//, ''), `projects/${url}`];
    for (const c of candidates) {
      if (resourceMap.has(c)) return Promise.resolve(resourceMap.get(c) as string);
    }
    // Fallback: try to find by filename only
    const filename = url.split('/').pop() || url;
    for (const [k, v] of resourceMap.entries()) {
      if (k.endsWith(filename)) return Promise.resolve(v);
    }
    return Promise.resolve('');
  }
}

// Override Angular's ResourceLoader so TestBed.resolveComponentResources can find templates/styles
TestBed.overrideProvider(ResourceLoader, { useValue: new VitestResourceLoader() });
