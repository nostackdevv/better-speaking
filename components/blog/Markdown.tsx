import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import Link from "next/link";

export function Markdown({ content }: { content: string }) {
  return (
    <article className="prose max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
        ]}
        components={{
          a: ({ href, children }) => {
            const url = href ?? "";
            const isExternal = url.startsWith("http");
            if (!url) return <span>{children}</span>;
            if (isExternal) {
              return (
                <a href={url} target="_blank" rel="noreferrer">
                  {children}
                </a>
              );
            }
            return <Link href={url}>{children}</Link>;
          },
          img: ({ alt, src }) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={src ?? ""}
              alt={alt ?? ""}
              className="rounded-2xl border border-slate-200 shadow-sm"
            />
          ),
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table>{children}</table>
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </article>
  );
}
