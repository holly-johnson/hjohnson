import 'zone.js';
import { TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ResourceLoader } from '@angular/compiler';

// Initialize the Angular testing environment
TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());

// Preload component resources (HTML and SCSS) using Vite's glob import as raw strings.
// The keys are file paths; map them by filename to make resolution by relative URLs easier.
const htmlResources = import.meta.glob('./projects/**/src/**/*.html', { as: 'raw', eager: true }) as Record<string, string>;
const styleResources = import.meta.glob('./projects/**/src/**/*.{css,scss,sass}', { as: 'raw', eager: true }) as Record<string, string>;

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
