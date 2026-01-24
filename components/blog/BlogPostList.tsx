'use client';

import { useState } from 'react';

import { BlogCategory, BlogPost } from '@/content/blog';

import { CategoryPills } from './CategoryPills';
import { PostCard } from './PostCard';

export function BlogPostList({
  categories,
  posts,
}: {
  categories: BlogCategory[];
  posts: BlogPost[];
}) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  return (
    <>
      <CategoryPills
        activeSlug={activeCategory ?? undefined}
        categories={categories}
        onSelect={setActiveCategory}
      />

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-700 uppercase">
            Latest
          </h3>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </section>
    </>
  );
}
