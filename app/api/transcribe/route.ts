import { NextRequest, NextResponse } from "next/server";
import type { TranscribeResponse, ApiError } from "@/types/api";
import { processAudioTranscription } from "@/lib/services/transcription.service";
import { TRANSCRIPT_DUMMY } from "@/dummy";
import { computeFillerStats } from "@/lib/filler/filler-stats";

export async function POST(
  request: NextRequest
): Promise<NextResponse<TranscribeResponse | ApiError>> {
  // Development mode: return dummy data
  if (TRANSCRIPT_DUMMY) {
    return NextResponse.json({
      ...TRANSCRIPT_DUMMY,
      fillerStats: computeFillerStats({
        fillers: TRANSCRIPT_DUMMY.fillers,
        words: TRANSCRIPT_DUMMY.words,
        duration: TRANSCRIPT_DUMMY.duration,
      }),
      createdAt: new Date().toISOString(),
    });
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get("file");

    if (!(audioFile instanceof Blob)) {
      return NextResponse.json(
        { error: "Invalid file upload" },
        { status: 400 }
      );
    }

    const result = await processAudioTranscription(audioFile);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Transcription error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Transcription failed";
    const statusCode = errorMessage.includes("File size")
      ? 400
      : errorMessage.includes("Invalid file type")
      ? 400
      : 500;

    return NextResponse.json<ApiError>(
      { error: errorMessage },
      { status: statusCode }
    );
  }
}
