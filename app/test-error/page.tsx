'use client';

import * as Sentry from '@sentry/nextjs';
import { useEffect, useState } from 'react';

export default function TestErrorPage() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [sentryStatus, setSentryStatus] = useState<string | null>(null);

  useEffect(() => {
    if (shouldCrash) {
      throw new Error('Test error for error boundary');
    }
  }, [shouldCrash]);

  const handleSentryTest = () => {
    try {
      // This captures a test error and sends it to Sentry
      Sentry.captureException(new Error('Manual Sentry test error'));
      Sentry.captureMessage('Test message from Sentry verification page');
      setSentryStatus('✅ Test error sent to Sentry! Check your dashboard.');
    } catch {
      setSentryStatus('❌ Failed to send to Sentry');
    }
  };

  const handleApiError = async () => {
    try {
      // Test server-side error capture
      const response = await fetch('/api/test-sentry');
      const data = await response.json();
      setSentryStatus(`API Response: ${JSON.stringify(data)}`);
    } catch {
      setSentryStatus('API error triggered - check Sentry dashboard');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-2xl font-bold">Sentry Error Testing</h1>
      <p className="max-w-md text-center text-gray-600">
        Use these buttons to verify Sentry is correctly configured and capturing
        errors.
      </p>

      <div className="mt-4 flex flex-col gap-3">
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          onClick={handleSentryTest}
        >
          Send Test Error to Sentry (No Crash)
        </button>

        <button
          className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          onClick={handleApiError}
        >
          Test Server-Side Error
        </button>

        <button
          className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          onClick={() => setShouldCrash(true)}
        >
          Trigger Error Boundary (Crashes Page)
        </button>
      </div>

      {sentryStatus && (
        <div className="mt-4 max-w-md rounded-lg bg-gray-100 p-4">
          <p className="text-sm">{sentryStatus}</p>
        </div>
      )}

      <div className="mt-8 max-w-md rounded-lg bg-gray-50 p-4 text-sm text-gray-600">
        <p className="mb-2 font-semibold">What to check:</p>
        <ul className="list-inside list-disc space-y-1">
          <li>Browser console for [Sentry] debug messages</li>
          <li>Terminal for server-side Sentry logs</li>
          <li>Sentry dashboard for new issues</li>
        </ul>
      </div>
    </div>
  );
}
