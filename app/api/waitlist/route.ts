import { NextRequest, NextResponse } from "next/server";
import { addToWaitlist } from "@/lib/services/waitlist.service";

export async function POST(request: NextRequest): Promise<NextResponse> {
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

    return NextResponse.json({
      success: true,
      message: result.alreadyExists
        ? "You're already on the waitlist!"
        : "Successfully joined waitlist",
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to join waitlist";

    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}
