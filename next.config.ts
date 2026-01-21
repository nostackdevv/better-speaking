import createMDX from '@next/mdx';
import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

import { securityHeaders, corsHeaders } from './config/http-headers';

const nextConfig: NextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
      {
        source: '/api/:path*',
        headers: [...corsHeaders],
      },
    ];
  },
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.unsplash.com' }],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withSentryConfig(withMDX(nextConfig), {
  silent: !process.env.CI,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  widenClientFileUpload: true,
  tunnelRoute: '/monitoring',
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
  disableLogger: true,
  automaticVercelMonitors: true,
});
