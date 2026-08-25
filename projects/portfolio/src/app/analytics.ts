import { DOCUMENT } from '@angular/common';
import { inject, provideEnvironmentInitializer } from '@angular/core';
import { injectUmami } from './umami';

/** Wire into `appConfig.providers`. Runs once, at bootstrap. See `umami.ts`. */
export function provideAnalytics() {
  return provideEnvironmentInitializer(() => {
    injectUmami(inject(DOCUMENT));
  });
}
