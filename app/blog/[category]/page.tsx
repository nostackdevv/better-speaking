import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogShell } from '@/components/blog/BlogShell';
import { CategoryPills } from '@/components/blog/CategoryPills';
import { PostCard } from '@/components/blog/PostCard';
import { getCategories, getPostsByCategory } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getCategories().map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategories().find((c) => c.slug === category);
  if (!cat) return { title: 'Category' };

  return {
    title: cat.label,
    description:
      cat.description ??
      'Speaking guidance: clearer structure, stronger delivery, fewer filler words.',
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;

  const cat = getCategories().find((c) => c.slug === category);
  if (!cat) notFound();

  const posts = getPostsByCategory(cat.slug);

  return (
    <BlogShell>
      <header className="text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-slate-600 uppercase">
          Category
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {cat.label}
        </h1>
        {cat.description && (
          <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-600">
            {cat.description}
          </p>
        )}

        <CategoryPills activeSlug={cat.slug} categories={getCategories()} />
      </header>

      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-700 uppercase">
            Articles
          </h3>
          <div className="h-px flex-1 bg-slate-200" />
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={`${p.category}/${p.slug}`} post={p} />
          ))}
        </div>
      </section>
    </BlogShell>
  );
}
