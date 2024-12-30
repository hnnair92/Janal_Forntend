import { useRuntimeConfig } from '#imports';
import * as Sentry from '@sentry/nuxt';

Sentry.init({
  // If set up, you can use your runtime config here
  dsn: useRuntimeConfig().public.SENTRY_DSN,
  release: '1.0.0',
  environment:useRuntimeConfig().public.SENTRY_ENVIRONMENT,
  tracesSampleRate: 1.0
});
