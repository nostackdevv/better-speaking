import Link from "next/link";
import { BlogCategory } from "@/content/blog";
import { ArrowUpRight } from "lucide-react";

function Pill({
  href,
  active,
  children,
}: {
  href: string;
  active?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "group inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition",
        active
          ? "border-slate-900 bg-slate-900 text-white"
          : "border-slate-200 bg-white/70 text-slate-800 hover:border-slate-300 hover:bg-white",
      ].join(" ")}
    >
      <span>{children}</span>
      <ArrowUpRight
        className={[
          "h-4 w-4 transition",
          active ? "opacity-90" : "opacity-40 group-hover:opacity-70",
        ].join(" ")}
        aria-hidden="true"
      />
    </Link>
  );
}

export function CategoryPills({
  categories,
  activeSlug,
}: {
  categories: BlogCategory[];
  activeSlug?: string;
}) {
  return (
    <div className="mt-8 flex flex-wrap justify-center gap-2">
      <Pill href="/blog" active={!activeSlug}>
        All
      </Pill>
      {categories.map((c) => (
        <Pill
          key={c.slug}
          href={`/blog/${c.slug}`}
          active={activeSlug === c.slug}
        >
          {c.label}
        </Pill>
      ))}
    </div>
  );
}
