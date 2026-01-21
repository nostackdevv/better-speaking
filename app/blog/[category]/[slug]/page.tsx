import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogShell } from '@/components/blog/BlogShell';
import { Markdown } from '@/components/blog/Markdown';
import { getAllPosts, getPost, formatDate } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(category, slug);

  if (!post) return { title: 'Post' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage.src, alt: post.coverImage.alt }],
      type: 'article',
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;

  const post = getPost(category, slug);
  if (!post) notFound();

  return (
    <BlogShell size="md">
      <div className="flex items-center justify-between gap-4">
        <Link
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
          href={`/blog/${post.category}`}
        >
          <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="text-xs font-semibold tracking-[0.18em] text-slate-600 uppercase">
          {formatDate(post.date)}
        </div>
      </div>

      <header className="mt-8">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          {post.title}
        </h1>

        <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">
            {post.author.name}
          </span>
          {post.author.role && (
            <span className="opacity-60">{post.author.role}</span>
          )}
          <span className="opacity-40">/</span>
          <span>{post.readingTime} min read</span>
        </div>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200 bg-white/70">
          <Image
            alt={post.coverImage.alt}
            className="object-cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 900px"
            src={post.coverImage.src}
          />
        </div>

        <div className="mt-6 flex flex-wrap gap-2">
          {post.tags.map((t) => (
            <span
              className="rounded-full border border-slate-200 bg-white/70 px-2.5 py-1 text-xs font-semibold text-slate-700"
              key={t}
            >
              {t}
            </span>
          ))}
        </div>
      </header>

      <article className="mt-10 rounded-3xl border border-slate-200 bg-white/70 p-6 sm:p-8">
        <Markdown content={post.content} />
      </article>

      <section className="mt-10 overflow-hidden rounded-3xl border border-slate-900 bg-slate-900 p-6 text-white sm:p-8">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/70 uppercase">
            Practice
          </p>
          <h3 className="mt-3 text-xl font-bold tracking-tight sm:text-2xl">
            Get objective feedback on your delivery.
          </h3>
          <p className="mt-3 leading-relaxed text-white/80">
            Record one minute. Speecha highlights filler patterns, pacing
            shifts, and where your structure loses clarity.
          </p>

          <Link
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white/90"
            href="/"
          >
            Try Speecha
            <ArrowRight aria-hidden="true" className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </section>
    </BlogShell>
  );
}
