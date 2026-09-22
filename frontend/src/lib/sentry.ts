import * as Sentry from "@sentry/react";

/**
 * Initializes Sentry error tracking for the frontend.
 *
 * No-op if VITE_SENTRY_DSN is not set (e.g. local development), so the
 * app works out of the box without requiring a Sentry account.
 */
export function initSentry(): void {
  const dsn = import.meta.env.VITE_SENTRY_DSN;

  if (!dsn) {
    return;
  }

  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    tracesSampleRate: 0.1,
  });
}
