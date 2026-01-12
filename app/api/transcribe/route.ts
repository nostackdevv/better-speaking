import { NextRequest, NextResponse } from "next/server";
import { processAudioTranscriptionStream } from "@/lib/services/transcription-stream.service";
import {
  checkRateLimit,
  checkSuccessLimit,
  addRateLimitHeaders,
} from "@/lib/middleware/rate-limit";
import { TRANSCRIPT_DUMMY } from "@/dummy";
import { computeFillerStats } from "@/lib/filler/filler-stats";
import { calculateClarityScore } from "@/lib/filler/clarity-score";
import { BadRequestError, handleError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  // const rateLimitResult = await checkRateLimit(request);
  // if (!rateLimitResult.success && rateLimitResult.response) {
  //   return rateLimitResult.response;
  // }

  if (false) {
    const fillerStats = computeFillerStats({
      fillers: TRANSCRIPT_DUMMY.fillers,
      words: TRANSCRIPT_DUMMY.words,
      duration: TRANSCRIPT_DUMMY.duration,
    });
    const clarityScore = calculateClarityScore(
      fillerStats,
      TRANSCRIPT_DUMMY.duration
    );
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
      throw new BadRequestError("Invalid file upload");
    }

    // Check successful transcription limit (10 per day)
    // const successLimitResult = await checkSuccessLimit(request);
    // if (!successLimitResult.success && successLimitResult.response) {
    //   return successLimitResult.response;
    // }

    return processAudioTranscriptionStream(audioFile);
  } catch (error) {
    return handleError(error);
  }
}
