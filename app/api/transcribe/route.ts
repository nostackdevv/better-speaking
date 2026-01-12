import { NextRequest } from "next/server";
import {
  processAudioTranscriptionStream,
  getDummyTranscriptionStream,
} from "@/lib/services/transcription-stream.service";
import { TRANSCRIPT_DUMMY } from "@/dummy";
import { BadRequestError, handleError } from "@/lib/errors";

export async function POST(request: NextRequest) {
  // const rateLimitResult = await checkRateLimit(request);
  // if (!rateLimitResult.success && rateLimitResult.response) {
  //   return rateLimitResult.response;
  // }

  if (false) {
    return getDummyTranscriptionStream();
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
