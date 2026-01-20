'use client';

import { Home } from 'lucide-react';
import Link from 'next/link';

import { Footer } from '@/components/layout/Footer';
import { Navbar } from '@/components/layout/Navbar';
import { ROUTES } from '@/lib/routes';

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-50 to-slate-100">
      <Navbar />

      {/* Main Content */}
      <main className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-2xl text-center">
          {/* 404 Visual */}
          <div className="relative mb-8">
            <div className="text-[120px] leading-none font-bold text-slate-300 md:text-[180px]">
              404
            </div>
          </div>

          {/* Message */}
          <h1 className="mb-4 text-3xl font-bold text-slate-900 md:text-4xl">
            Page Not Found
          </h1>
          <p className="mx-auto mb-8 max-w-md text-lg text-slate-600">
            This wasn’t supposed to happen. The page you’re looking for is
            missing. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-6 py-3 font-semibold text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-700"
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
