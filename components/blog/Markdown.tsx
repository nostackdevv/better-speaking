import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';

export function Markdown({ content }: { content: string }) {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        components={{
          a: ({ href, children }) => {
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
          img: ({ alt, src }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              alt={alt ?? ''}
              className="rounded-2xl border border-slate-200 shadow-sm"
              src={src ?? ''}
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: 'wrap' }],
        ]}
        remarkPlugins={[remarkGfm]}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
