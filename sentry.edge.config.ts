import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,

  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,

  // Filter operational errors
  beforeSend(event, hint) {
    const error = hint.originalException as Error & {
      isOperational?: boolean;
      statusCode?: number;
    };
    if (error?.isOperational) {
      return null;
    }
    event.tags = {
      ...event.tags,
      runtime: "edge",
    };
    return event;
  },
  // debug: process.env.NODE_ENV === "development",
});
