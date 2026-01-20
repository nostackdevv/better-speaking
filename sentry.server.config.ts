import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn:
    process.env.NODE_ENV === 'production' ? process.env.SENTRY_DSN : undefined,
  environment: process.env.NODE_ENV,
  tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.2 : 1.0,
  profilesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,

  // Filter operational errors (expected user-facing errors)
  beforeSend(event, hint) {
    const error = hint.originalException as Error & {
      isOperational?: boolean;
      statusCode?: number;
    };
    if (error?.isOperational) {
      return null;
    }

    // Don't report 4xx errors as they're client issues
    // if (error?.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
    //   return null;
    // }
    event.tags = {
      ...event.tags,
      runtime: 'nodejs',
    };

    return event;
  },

  // Ignore common non-actionable errors
  ignoreErrors: [
    // Network issues
    'ECONNREFUSED',
    'ENOTFOUND',
    'ETIMEDOUT',
    'ECONNRESET',

    // Expected operational errors
    'BadRequestError',
    'ValidationError',
    'RateLimitError',
    'UnauthorizedError',
    'ForbiddenError',
    'NotFoundError',
  ],

  // Limit breadcrumbs
  maxBreadcrumbs: 50,
  // debug: process.env.NODE_ENV === "development",
});
