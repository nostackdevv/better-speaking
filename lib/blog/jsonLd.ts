// lib/blog/jsonLd.ts
import { BlogPost } from '@/content/blog';
import { APP_URL } from '@/lib/constants';

export function generateArticleJsonLd(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.coverImage.src,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author.name,
      url: APP_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Speecha',
      logo: {
        '@type': 'ImageObject',
        url: `${APP_URL}/favicon-96x96.png`,
      },
    },
    mainEntityOfPage: `${APP_URL}/blog/${post.slug}`,
  };
}

export function generateWebsiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Speecha',
    url: APP_URL,
    description:
      'Track and reduce filler words to become a more confident speaker.',
    publisher: {
      '@type': 'Organization',
      name: 'Speecha',
    },
  };
}
