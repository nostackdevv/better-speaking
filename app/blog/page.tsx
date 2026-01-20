import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { BlogShell } from '@/components/blog/BlogShell';
import { CategoryPills } from '@/components/blog/CategoryPills';
import { PostCard } from '@/components/blog/PostCard';
import {
  getAllPosts,
  getCategories,
  getFeaturedPost,
  formatDate,
  readingTimeMinutes,
} from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Clear, confident speaking: practical drills, meeting frameworks, pacing, and filler-word reduction.',
};

export default function BlogIndexPage() {
  const categories = getCategories();
  const posts = getAllPosts();
  const featured = getFeaturedPost();

  return (
    <BlogShell>
      <header className="text-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-slate-600 uppercase">
          Speecha Journal
        </p>

        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Clarity is a skill.
          <br className="hidden sm:block" />
          Confidence is a system.
        </h1>

        <p className="mx-auto mt-5 max-w-2xl leading-relaxed text-slate-600">
          Short, practical posts for people who speak on camera, in meetings, or
          on stage. Less filler. Better structure. Cleaner delivery.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
            href="/"
          >
            Try Speecha
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <CategoryPills categories={categories} />
      </header>

      {featured && (
        <section className="mt-12">
          <Link
            className="group block overflow-hidden rounded-3xl border border-slate-200 bg-white/70 backdrop-blur-sm transition hover:bg-white"
            href={`/blog/${featured.category}/${featured.slug}`}
          >
            <div className="grid md:grid-cols-12">
              <div className="relative min-h-[260px] md:col-span-7">
                <Image
                  alt={featured.coverImage.alt}
                  className="object-cover"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 900px"
                  src={featured.coverImage.src}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                <div className="absolute right-5 bottom-5 left-5">
                  <div className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                    Featured
                  </div>
                </div>
              </div>

              <div className="p-7 md:col-span-5">
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span>{formatDate(featured.date)}</span>
                  <span className="opacity-40">/</span>
                  <span>{readingTimeMinutes(featured.content)} min</span>
                  <span className="opacity-40">/</span>
                  <span className="font-semibold text-slate-800">
                    {featured.author.name}
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold tracking-tight text-slate-900">
                  {featured.title}
                </h2>

                <p className="mt-3 leading-relaxed text-slate-600">
                  {featured.description}
                </p>

                <div className="mt-6 inline-flex items-center text-sm font-semibold text-slate-900">
                  Read article
                  <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* Grid */}
      <section className="mt-12">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="text-sm font-semibold tracking-[0.18em] text-slate-700 uppercase">
            Latest
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
