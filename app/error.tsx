'use client';

import * as Sentry from '@sentry/nextjs';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ROUTES } from '@/lib/routes';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />

      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* Error Visual */}
          <div className="relative mb-8">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-12 w-12 text-red-600" />
            </div>
          </div>

          {/* Message */}
          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Something Went Wrong
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg text-slate-600">
            We encountered an unexpected error. Our team has been notified and
            is working on a fix.
          </p>

          {/* Dev error details */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mx-auto mb-8 max-w-md rounded-xl bg-slate-100 p-4 text-left">
              <p className="font-mono text-sm break-all text-slate-700">
                {error.message}
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-slate-500">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
              onClick={reset}
            >
              <RefreshCw className="h-5 w-5" />
              Try Again
            </button>
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-slate-200 px-6 py-3 font-semibold text-slate-700 transition-colors hover:bg-slate-300"
              href={ROUTES.home}
            >
              <Home className="h-5 w-5" />
              Go Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
