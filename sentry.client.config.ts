import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn:
    process.env.NODE_ENV === 'production'
      ? process.env.NEXT_PUBLIC_SENTRY_DSN
      : undefined,
  environment: process.env.NODE_ENV,

  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
    Sentry.browserTracingIntegration(),
  ],

  ignoreErrors: [
    'top.GLOBALS',
    'originalCreateNotification',
    'canvas.contentDocument',
    'MyApp_RemoveAllHighlights',
    'http://tt.telepornsites.com',
    'jigsaw is not defined',
    'ComboSearch is not defined',
    'atomicFindClose',

    'Network request failed',
    'Failed to fetch',
    'NetworkError',
    'AbortError',
    /^AbortError/,
    'The operation was aborted',
    'The user aborted a request',
  ],

  denyUrls: [
    /extensions\//i,
    /^chrome:\/\//i,
    /^chrome-extension:\/\//i,
    /^moz-extension:\/\//i,
    /^safari-extension:\/\//i,
  ],

  // Scrub sensitive data before sending
  beforeSend(event) {
    if (event.request?.data) {
      delete event.request.data;
    }
    if (event.request?.cookies) {
      delete event.request.cookies;
    }
    event.tags = {
      ...event.tags,
      client_type: 'browser',
    };

    return event;
  },

  maxBreadcrumbs: 50,
  // debug: process.env.NODE_ENV === "development",
});
