import dotenv from 'dotenv';
import * as Sentry from '@sentry/nuxt';

dotenv.config();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.SENTRY_ENVIRONMENT,
  release: '1.0.0',
  tracesSampleRate: 1.0
});
