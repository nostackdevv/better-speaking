import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/services/waitlist.service";
import {
  checkWaitlistRateLimit,
  addRateLimitHeaders,
} from "@/lib/middleware/rate-limit";
import { BadRequestError, handleError } from "@/lib/errors";

export async function POST(request: NextRequest): Promise<NextResponse> {
  // Check rate limit
  const rateLimitResult = await checkWaitlistRateLimit(request);
  if (!rateLimitResult.success && rateLimitResult.response) {
    return rateLimitResult.response;
  }

  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email || typeof email !== "string") {
      throw new BadRequestError("Email is required");
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      throw new BadRequestError("Invalid email format");
    }

    // Add to waitlist in Supabase
    const result = await addToWaitlist({
      email,
      source: "web",
    });

    const response = NextResponse.json({
      success: true,
      message: result.alreadyExists
        ? "You're already on the waitlist!"
        : "Successfully joined waitlist",
    });

    // Add rate limit headers to successful response
    return addRateLimitHeaders(response, rateLimitResult);
  } catch (error) {
    return handleError(error);
  }
}
