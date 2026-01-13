"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function TestErrorPage() {
  const [shouldCrash, setShouldCrash] = useState(false);
  const [sentryStatus, setSentryStatus] = useState<string | null>(null);

  useEffect(() => {
    if (shouldCrash) {
      throw new Error("Test error for error boundary");
    }
  }, [shouldCrash]);

  const handleSentryTest = () => {
    try {
      // This captures a test error and sends it to Sentry
      Sentry.captureException(new Error("Manual Sentry test error"));
      Sentry.captureMessage("Test message from Sentry verification page");
      setSentryStatus("✅ Test error sent to Sentry! Check your dashboard.");
    } catch (e) {
      setSentryStatus("❌ Failed to send to Sentry");
    }
  };

  const handleApiError = async () => {
    try {
      // Test server-side error capture
      const response = await fetch("/api/test-sentry");
      const data = await response.json();
      setSentryStatus(`API Response: ${JSON.stringify(data)}`);
    } catch (e) {
      setSentryStatus("API error triggered - check Sentry dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-8">
      <h1 className="text-2xl font-bold">Sentry Error Testing</h1>
      <p className="text-gray-600 text-center max-w-md">
        Use these buttons to verify Sentry is correctly configured and capturing
        errors.
      </p>

      <div className="flex flex-col gap-3 mt-4">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={handleSentryTest}
        >
          Send Test Error to Sentry (No Crash)
        </button>

        <button
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
          onClick={handleApiError}
        >
          Test Server-Side Error
        </button>

        <button
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          onClick={() => setShouldCrash(true)}
        >
          Trigger Error Boundary (Crashes Page)
        </button>
      </div>

      {sentryStatus && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg max-w-md">
          <p className="text-sm">{sentryStatus}</p>
        </div>
      )}

      <div className="mt-8 p-4 bg-gray-50 rounded-lg max-w-md text-sm text-gray-600">
        <p className="font-semibold mb-2">What to check:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Browser console for [Sentry] debug messages</li>
          <li>Terminal for server-side Sentry logs</li>
          <li>Sentry dashboard for new issues</li>
        </ul>
      </div>
    </div>
  );
}
