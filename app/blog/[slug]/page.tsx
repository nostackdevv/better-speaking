import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogCTA } from '@/components/blog/BlogCTA';
import { BlogShell } from '@/components/blog/BlogShell';
import { Markdown } from '@/components/blog/Markdown';
import { getAllPosts, getPostBySlug, formatDate } from '@/lib/blog';
import { generateArticleJsonLd } from '@/lib/blog/jsonLd';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: 'Post' };

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage.src, alt: post.coverImage.alt }],
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified ?? post.date,
      authors: [post.author.name],
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = generateArticleJsonLd(post);

  return (
    <BlogShell size="md">
      <script
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        type="application/ld+json"
      />

      <div className="flex items-center justify-between gap-4">
        <Link
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white"
          href="/blog"
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

      {post.showBlogCta !== false && <BlogCTA />}
    </BlogShell>
  );
}
