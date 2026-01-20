import type { Metadata } from "next";

import { BlogNavbar } from "@/components/blog/BlogNavbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Speecha Blog",
    default: "Speecha Blog",
  },
  description:
    "Practical, research-backed speaking tools: clarity, confidence, pacing, and filler-word reduction.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="pointer-events-none fixed inset-0 opacity-[0.55]">
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_20%_-10%,rgba(15,23,42,0.07),transparent_60%),radial-gradient(900px_500px_at_80%_10%,rgba(15,23,42,0.06),transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.05)_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="relative">
        <BlogNavbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
