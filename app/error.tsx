"use client";

import * as Sentry from "@sentry/nextjs";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ROUTES } from "@/lib/routes";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <Navbar />

      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Visual */}
          <div className="mb-8 relative">
            <div className="w-24 h-24 mx-auto rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            We encountered an unexpected error. Our team has been notified and
            is working on a fix.
          </p>

          {/* Dev error details */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-8 p-4 bg-slate-100 rounded-xl text-left max-w-md mx-auto">
              <p className="text-sm font-mono text-slate-700 break-all">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-slate-500 mt-2">
                  Error ID: {error.digest}
                </p>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
              onClick={reset}
            >
              <RefreshCw className="w-5 h-5" />
              Try Again
            </button>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 bg-slate-200 text-slate-700 font-semibold rounded-xl hover:bg-slate-300 transition-colors"
              href={ROUTES.home}
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
