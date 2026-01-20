export interface FormatErrorArgs {
  retryAfter: number;
  limit: number;
  remaining: number;
}

export const RATE_LIMIT_CONFIG = {
  transcribe: {
    limit: 10,
    window: '5 m' as const,
    prefix: '@ratelimit/transcribe',
    errorTitle: 'Rate limit exceeded',
    formatError: ({ retryAfter }: FormatErrorArgs) => {
      const mins = Math.ceil(retryAfter / 60);
      return `Too many requests. Please try again in ${mins} minute${mins !== 1 ? 's' : ''}.`;
    },
  },
  transcribeSuccess: {
    limit: 5,
    window: '1 d' as const,
    prefix: '@ratelimit/transcribe-success',
    errorTitle: 'Daily limit exceeded',
    formatError: ({ limit }: FormatErrorArgs) =>
      `You have reached your daily limit of ${limit} sessions. Please try again tomorrow.`,
  },
  waitlist: {
    limit: 3,
    window: '1 h' as const,
    prefix: '@ratelimit/waitlist',
    errorTitle: 'Too many waitlist submissions',
    formatError: ({ retryAfter }: FormatErrorArgs) => {
      const mins = Math.ceil(retryAfter / 60);
      return `Please wait ${mins} minute${mins !== 1 ? 's' : ''} before trying again.`;
    },
  },
} as const;

export type RateLimitType = keyof typeof RATE_LIMIT_CONFIG;
