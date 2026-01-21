import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

import { RATE_LIMIT_CONFIG, RateLimitType } from './config';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

function createLimiter(type: RateLimitType): Ratelimit {
  const config = RATE_LIMIT_CONFIG[type];
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(config.limit, config.window),
    analytics: true,
    prefix: config.prefix,
  });
}

export const limiters: Record<RateLimitType, Ratelimit> = {
  transcribe: createLimiter('transcribe'),
  analyze: createLimiter('analyze'),
  analyzeSuccess: createLimiter('analyzeSuccess'),
  waitlist: createLimiter('waitlist'),
};
