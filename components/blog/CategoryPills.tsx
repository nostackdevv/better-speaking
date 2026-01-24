'use client';

import { BlogCategory } from '@/content/blog';

function Pill({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      className={[
        'inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition',
        active
          ? 'border-slate-900 bg-slate-900 text-white'
          : 'border-slate-200 bg-white/70 text-slate-800 hover:border-slate-300 hover:bg-white',
      ].join(' ')}
      onClick={onClick}
      type="button"
    >
      <span>{children}</span>
    </button>
  );
}

export function CategoryPills({
  categories,
  activeSlug,
  onSelect,
}: {
  categories: BlogCategory[];
  activeSlug?: string;
  onSelect: (slug: string | null) => void;
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <Pill active={!activeSlug} onClick={() => onSelect(null)}>
        All
      </Pill>
      {categories.map((c) => (
        <Pill
          active={activeSlug === c.slug}
          key={c.slug}
          onClick={() => onSelect(c.slug)}
        >
          {c.label}
        </Pill>
      ))}
    </div>
  );
}
