import Image from "next/image";
import Link from "next/link";

import { BlogPost } from "@/content/blog";
import { formatDate, readingTimeMinutes } from "@/lib/blog";

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      className="group block rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition overflow-hidden"
      href={`/blog/${post.category}/${post.slug}`}
    >
      <div className="relative aspect-[16/9]">
        <Image
          alt={post.coverImage.alt}
          className="object-cover"
          fill
          sizes="(max-width: 768px) 100vw, 600px"
          src={post.coverImage.src}
        />
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <span>{formatDate(post.date)}</span>
          <span>•</span>
          <span>{readingTimeMinutes(post.content)} min read</span>
        </div>

        <h3 className="mt-2 text-lg font-semibold text-slate-900 group-hover:underline">
          {post.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          {post.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((t) => (
            <span
              className="text-xs px-2 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-700"
              key={t}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
