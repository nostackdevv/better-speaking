import { NextRequest, NextResponse } from "next/server";
import { processAudioTranscription } from "@/lib/services/transcription.service";
import {
  checkRateLimit,
  checkSuccessLimit,
  addRateLimitHeaders,
} from "@/lib/middleware/rate-limit";
import { TRANSCRIPT_DUMMY } from "@/dummy";
import { computeFillerStats } from "@/lib/filler/filler-stats";
import { calculateClarityScore } from "@/lib/filler/clarity-score";

export async function POST(request: NextRequest): Promise<NextResponse> {
  const rateLimitResult = await checkRateLimit(request);
  if (!rateLimitResult.success && rateLimitResult.response) {
    return rateLimitResult.response;
  }

  if (TRANSCRIPT_DUMMY) {
    const fillerStats = computeFillerStats({
      fillers: TRANSCRIPT_DUMMY.fillers,
      words: TRANSCRIPT_DUMMY.words,
      duration: TRANSCRIPT_DUMMY.duration,
    });
    const clarityScore = calculateClarityScore(fillerStats, TRANSCRIPT_DUMMY.duration);
    const response = NextResponse.json({
      ...TRANSCRIPT_DUMMY,
      fillerStats,
      clarityScore,
      createdAt: new Date().toISOString(),
    });
    return response;
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get("file");

    if (!(audioFile instanceof Blob)) {
      const response = NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
      // addRateLimitHeaders(response, rateLimitResult);
      return response;
    }

    // Check successful transcription limit (10 per day)
    // const successLimitResult = await checkSuccessLimit(request);
    // if (!successLimitResult.success && successLimitResult.response) {
    //   return successLimitResult.response;
    // }

    const result = await processAudioTranscription(audioFile);
    const response = NextResponse.json(result);
    // addRateLimitHeaders(response, rateLimitResult);
    return response;
  } catch (error) {
    console.error("Transcription error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Transcription failed";
    const statusCode = errorMessage.includes("File size")
      ? 400
      : errorMessage.includes("Invalid file type")
      ? 400
      : 500;

    const response = NextResponse.json(
      { error: errorMessage },
      { status: statusCode }
    );
    // addRateLimitHeaders(response, rateLimitResult);
    return response;
  }
}
