import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/services/waitlist.service";
import {
  checkWaitlistRateLimit,
  addRateLimitHeaders,
} from "@/lib/middleware/rate-limit";

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
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
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
    const errorMessage =
      error instanceof Error ? error.message : "Failed to join waitlist";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
