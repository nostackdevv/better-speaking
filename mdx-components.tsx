import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
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
    ...components,
  };
}
