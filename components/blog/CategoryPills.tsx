import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

import { BlogCategory } from '@/content/blog';

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      className={[
        'group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition',
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white/70 text-slate-800 hover:border-slate-300 hover:bg-white',
      ].join(' ')}
      href={href}
    >
      <span>{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className={[
          'h-4 w-4 transition',
          active ? 'opacity-90' : 'opacity-40 group-hover:opacity-70',
        ].join(' ')}
      />
    </Link>
  );
}

export function CategoryPills({
  categories,
  activeSlug,
}: {
  categories: BlogCategory[];
  activeSlug?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <Pill active={!activeSlug} href="/blog">
        All
      </Pill>
      {categories.map((c) => (
        <Pill
          active={activeSlug === c.slug}
          href={`/blog/${c.slug}`}
          key={c.slug}
        >
          {c.label}
        </Pill>
      ))}
    </div>
  );
}
