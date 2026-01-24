import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { ROUTES } from '@/lib/routes';

export function BlogCTA() {
  return (
    <section className="mt-10 overflow-hidden rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white sm:p-8">
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase">
          Practice
        </p>
        <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
          Get objective feedback on your delivery.
        </h3>
        <p className="mt-3 leading-relaxed text-white/80">
          Record yourself for up to two minutes. Speecha helps you to highlight
          your filler word patterns, which you can use to improve your speaking
          skills.
        </p>

        <Link
          className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
          data-ph-capture-click="blog_cta_clicked"
          href={ROUTES.home}
        >
          Try Speecha
          <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
