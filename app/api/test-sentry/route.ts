import * as Sentry from "@sentry/nextjs";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Capture a test error
    Sentry.captureException(new Error("Test server-side Sentry error"));
    Sentry.captureMessage("Test server message from API route");

    // Also throw an error to test the error handler
    // Uncomment below to test actual error handling:
    // throw new Error("Intentional server error for testing");

    return NextResponse.json({
      success: true,
      message: "Test error sent to Sentry! Check your dashboard.",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    Sentry.captureException(error);
    return NextResponse.json(
      { success: false, error: "Server error occurred" },
      { status: 500 }
    );
  }
}
