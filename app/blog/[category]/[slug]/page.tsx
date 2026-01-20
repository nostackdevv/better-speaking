import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlogShell } from "@/components/blog/BlogShell";
import { Markdown } from "@/components/blog/Markdown";
import { getAllPosts, getPost, formatDate, readingTimeMinutes } from "@/lib/blog";

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

  if (!post) return { title: "Post" };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [{ url: post.coverImage.src, alt: post.coverImage.alt }],
      type: "article",
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
          className="inline-flex items-center rounded-xl border border-slate-200 bg-white/70 px-3 py-2 text-sm font-semibold text-slate-900 hover:bg-white transition"
          href={`/blog/${post.category}`}
        >
          <ArrowLeft aria-hidden="true" className="mr-2 h-4 w-4" />
          Back
        </Link>

        <div className="text-xs font-semibold tracking-[0.18em] uppercase text-slate-600">
          {formatDate(post.date)}
        </div>
      </div>

      <header className="mt-8">
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-slate-900">
          {post.title}
        </h1>

        <p className="mt-5 text-slate-600 leading-relaxed text-base sm:text-lg">
          {post.description}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-slate-600">
          <span className="font-semibold text-slate-800">{post.author.name}</span>
          {post.author.role && <span className="opacity-60">{post.author.role}</span>}
          <span className="opacity-40">/</span>
          <span>{readingTimeMinutes(post.content)} min read</span>
        </div>

        <div className="mt-8 relative aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200 bg-white/70">
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

      <section className="mt-10 overflow-hidden rounded-3xl border border-slate-900 bg-slate-900 p-6 sm:p-8 text-white">
        <div className="max-w-xl">
          <p className="text-xs font-semibold tracking-[0.22em] uppercase text-white/70">
            Practice
          </p>
          <h3 className="mt-3 text-xl sm:text-2xl font-bold tracking-tight">
            Get objective feedback on your delivery.
          </h3>
          <p className="mt-3 text-white/80 leading-relaxed">
            Record one minute. Speecha highlights filler patterns, pacing shifts,
            and where your structure loses clarity.
          </p>

          <Link
            className="mt-6 inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-white/90 transition"
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
