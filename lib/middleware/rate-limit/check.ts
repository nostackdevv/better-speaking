import { NextRequest, NextResponse } from 'next/server';

import { RATE_LIMIT_CONFIG, RateLimitType } from './config';
import { limiters } from './limiters';

export interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
  response?: NextResponse<{
    error: string;
    message: string;
    retryAfter: number;
  }>;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

export async function checkLimit(
  request: NextRequest,
  type: RateLimitType
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const config = RATE_LIMIT_CONFIG[type];
  const { success, limit, remaining, reset } = await limiters[type].limit(ip);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);

    return {
      success: false,
      limit,
      remaining,
      reset,
      response: NextResponse.json(
        {
          error: config.errorTitle,
          message: config.formatError({ retryAfter, limit, remaining }),
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': limit.toString(),
            'X-RateLimit-Remaining': remaining.toString(),
            'X-RateLimit-Reset': new Date(reset).toISOString(),
          },
        }
      ),
    };
  }

  return {
    success: true,
    limit,
    remaining,
    reset,
  };
}

export async function checkLimits(
  request: NextRequest,
  types: RateLimitType[]
): Promise<RateLimitResult> {
  let lastResult: RateLimitResult | null = null;

  for (const type of types) {
    const result = await checkLimit(request, type);
    if (!result.success) return result;
    lastResult = result;
  }

  return lastResult!;
}

export function addRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult
): NextResponse {
  response.headers.set('X-RateLimit-Limit', result.limit.toString());
  response.headers.set('X-RateLimit-Remaining', result.remaining.toString());
  response.headers.set(
    'X-RateLimit-Reset',
    new Date(result.reset).toISOString()
  );
  return response;
}
