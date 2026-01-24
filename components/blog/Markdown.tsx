import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

import { BlogChallenge } from '@/components/blog/BlogChallenge';
import { BlogCTA } from '@/components/blog/BlogCTA';

const components = {
  BlogChallenge,
  BlogCTA,
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => {
    const url = href ?? '';
    const isExternal = url.startsWith('http');
    if (!url) return <span>{children}</span>;
    if (isExternal) {
      return (
        <a href={url} rel="noreferrer" target="_blank">
          {children}
        </a>
      );
    }
    return <Link href={url}>{children}</Link>;
  },
  img: ({ alt, src }: { alt?: string; src?: string }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={alt ?? ''}
      className="rounded-2xl border border-slate-200 shadow-sm"
      src={src ?? ''}
    />
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="overflow-x-auto">
      <table>{children}</table>
    </div>
  ),
};

export function Markdown({ content }: { content: string }) {
  return (
    <article className="prose max-w-none">
      <MDXRemote
        components={components}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: 'wrap' }],
            ],
          },
        }}
        source={content}
      />
    </article>
  );
}
