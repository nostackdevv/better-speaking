import { BLOG_CATEGORIES, BLOG_POSTS } from "@/content/blog";

export function getCategories() {
  return BLOG_CATEGORIES;
}

export function getAllPosts() {
  return [...BLOG_POSTS].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getFeaturedPost() {
  return getAllPosts().find((p) => p.featured) ?? null;
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPost(category: string, slug: string) {
  return (
    BLOG_POSTS.find((p) => p.category === category && p.slug === slug) ?? null
  );
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function readingTimeMinutes(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, "")
    .replace(/[#>*_\-\[\]\(\)`]/g, "")
    .split(/\s+/)
    .filter(Boolean).length;

  const wpm = 220;
  return Math.max(1, Math.round(words / wpm));
}

export function buildBlogPostUrl(post: { category: string; slug: string }) {
  return `/blog/${post.category}/${post.slug}`;
}

export function buildBlogCategoryUrl(category: string) {
  return `/blog/${category}`;
}

export function getCategoryBySlug(slug: string) {
  return BLOG_CATEGORIES.find((c) => c.slug === slug) ?? null;
}

export function getRelatedPosts(post: { category: string; slug: string }) {
  const sameCategory = getPostsByCategory(post.category).filter(
    (p) => p.slug !== post.slug
  );

  const byTagScore = sameCategory
    .map((p) => ({
      post: p,
      score: p.tags.reduce((acc, t) => acc + (p.tags.includes(t) ? 1 : 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.post);

  return byTagScore.slice(0, 3);
}
