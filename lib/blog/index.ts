import fs from 'fs';
import path from 'path';

import { BLOG_CATEGORIES, BLOG_POSTS, BlogPost } from '@/content/blog';

export type BlogPostWithContent = BlogPost & {
  content: string;
  readingTime: number;
};

const WORDS_PER_MINUTE = 238;

function getReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function getCategories() {
  return BLOG_CATEGORIES;
}

export function getAllPosts() {
  return [...BLOG_POSTS]
    .map((post) => {
      const filePath = path.join(
        process.cwd(),
        'content/blog/posts',
        `${post.slug}.mdx`
      );
      const content = fs.readFileSync(filePath, 'utf-8');
      return { ...post, readingTime: getReadingTime(content) };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getFeaturedPost() {
  return getAllPosts().find((p) => p.featured) ?? null;
}

export function getPostsByCategory(category: string) {
  return getAllPosts().filter((p) => p.category === category);
}

export function getPost(
  category: string,
  slug: string
): BlogPostWithContent | null {
  const post = BLOG_POSTS.find(
    (p) => p.category === category && p.slug === slug
  );
  if (!post) return null;

  const filePath = path.join(
    process.cwd(),
    'content/blog/posts',
    `${slug}.mdx`
  );
  const content = fs.readFileSync(filePath, 'utf-8');

  return { ...post, content, readingTime: getReadingTime(content) };
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
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

export function getRelatedPosts(post: {
  category: string;
  slug: string;
  tags: string[];
}) {
  const sameCategory = getPostsByCategory(post.category).filter(
    (p) => p.slug !== post.slug
  );

  const byTagScore = sameCategory
    .map((p) => ({
      post: p,
      score: p.tags.filter((t) => post.tags.includes(t)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .map((x) => x.post);

  return byTagScore.slice(0, 3);
}
