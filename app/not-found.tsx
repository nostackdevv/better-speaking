"use client";

import { Home } from "lucide-react";
import Link from "next/link";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ROUTES } from "@/lib/routes";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="min-h-[calc(100vh-200px)] flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Visual */}
          <div className="mb-8 relative">
            <div className="text-[120px] md:text-[180px] font-bold text-slate-300 leading-none">
              404
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Page Not Found
          </h1>
          <p className="text-lg text-slate-600 mb-8 max-w-md mx-auto">
            This wasn’t supposed to happen. The page you’re looking for is
            missing. Let&apos;s get you back on track.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-600 text-white font-semibold rounded-xl hover:bg-orange-700 transition-colors shadow-lg shadow-orange-600/20"
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
