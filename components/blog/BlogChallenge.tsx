import Link from 'next/link';

import { ROUTES } from '@/lib/routes';

export function BlogChallenge() {
  return (
    <div className="not-prose">
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-slate-900 to-slate-800 p-6">
        <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-gradient-to-br from-orange-500/20 to-rose-500/20 blur-2xl" />
        <div className="relative z-10 flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
          <div className="flex-1 text-center sm:text-left">
            <div className="mb-2 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-orange-400 uppercase">
              <svg
                className="h-3.5 w-3.5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  clipRule="evenodd"
                  d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                  fillRule="evenodd"
                />
              </svg>
              60-second challenge
            </div>
            <p className="mt-0 mb-1 text-lg font-semibold text-white">
              Think you don&apos;t use filler words?
            </p>
            <p className="text-sm text-slate-400">
              Prove it. Record yourself and see the truth.
            </p>
          </div>
          <Link
            className="inline-flex items-center gap-2 rounded-full bg-orange-600 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white transition-all hover:opacity-90"
            data-ph-capture-click="blog_challenge_clicked"
            href={ROUTES.home}
          >
            Take the challenge
          </Link>
        </div>
      </div>
    </div>
  );
}
