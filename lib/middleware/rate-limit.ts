import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, "1 m"),
  analytics: true,
  prefix: "@ratelimit/transcribe",
});

const successRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(20, "1 d"),
  analytics: true,
  prefix: "@ratelimit/transcribe-success",
});

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

/**
 * Check rate limit for an IP address
 * @param request - Next.js request object
 * @returns Rate limit result with success status and remaining quota
 */
export async function checkRateLimit(
  request: NextRequest
): Promise<RateLimitResult> {
  const ip = getClientIP(request);
  const { success, limit, remaining, reset } = await ratelimit.limit(ip);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);

    return {
      success: false,
      limit,
      remaining,
      reset,
      response: NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: `Too many requests. Please try again in ${retryAfter} seconds.`,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
            "X-RateLimit-Reset": new Date(reset).toISOString(),
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

/**
 * Extract client IP address from request
 * Checks common headers set by proxies and load balancers
 */
function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    // x-forwarded-for can contain multiple IPs, take the first one (client IP)
    return forwarded.split(",")[0].trim();
  }

  const realIP = request.headers.get("x-real-ip");
  if (realIP) {
    return realIP;
  }

  // Fallback (shouldn't happen in production with proper hosting)
  return "unknown";
}

/**
 * Check if IP has exceeded successful transcription limit
 * Call this AFTER a successful transcription to track it
 * @param request - Next.js request object
 * @returns Rate limit result for successful transcriptions
 */
export async function checkSuccessLimit(
  request: NextRequest
): Promise<RateLimitResult> {
  const ip = getClientIP(request);

  const { success, limit, remaining, reset } = await successRatelimit.limit(ip);

  if (!success) {
    const retryAfter = Math.ceil((reset - Date.now()) / 1000);

    return {
      success: false,
      limit,
      remaining,
      reset,
      response: NextResponse.json(
        {
          error: "Daily transcription limit exceeded",
          message: `You have reached your daily limit of ${limit} transcriptions. Please try again tomorrow.`,
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": limit.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": new Date(reset).toISOString(),
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

/**
 * Add rate limit headers to a response
 */
export function addRateLimitHeaders(
  response: NextResponse,
  result: RateLimitResult
): NextResponse {
  response.headers.set("X-RateLimit-Limit", result.limit.toString());
  response.headers.set("X-RateLimit-Remaining", result.remaining.toString());
  response.headers.set(
    "X-RateLimit-Reset",
    new Date(result.reset).toISOString()
  );

  return response;
}
