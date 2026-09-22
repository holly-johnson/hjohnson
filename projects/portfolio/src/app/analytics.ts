import { DOCUMENT } from '@angular/common';
import { inject, provideEnvironmentInitializer } from '@angular/core';
import { injectUmami } from './umami';
import { injectGoogleAnalytics } from './google-analytics';

/**
 * Wire into `appConfig.providers`. Runs once, at bootstrap.
 * See `umami.ts` and `google-analytics.ts`.
 */
export function provideAnalytics() {
  return provideEnvironmentInitializer(() => {
    const doc = inject(DOCUMENT);
    injectUmami(doc);
    injectGoogleAnalytics(doc);
  });
}
