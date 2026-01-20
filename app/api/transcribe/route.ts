import { NextRequest, NextResponse } from 'next/server';

import { BadRequestError, handleError } from '@/lib/errors';
import { checkLimit, addRateLimitHeaders } from '@/lib/middleware/rate-limit';
import {
  processAudioTranscriptionStream,
  getDummyTranscriptionStream,
} from '@/lib/services/transcription-stream.service';

export async function POST(request: NextRequest) {
  const rateLimit = await checkLimit(request, 'transcribe');
  if (!rateLimit.success) return rateLimit.response!;

  if (false) {
    return getDummyTranscriptionStream();
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get('file');

    if (!(audioFile instanceof Blob)) {
      throw new BadRequestError('Invalid file upload');
    }

    const successLimit = await checkLimit(request, 'transcribeSuccess');
    if (!successLimit.success) return successLimit.response!;

    const response = await processAudioTranscriptionStream(audioFile);

    const nextResponse = new NextResponse(response.body, {
      status: response.status,
      headers: response.headers,
    });

    return addRateLimitHeaders(nextResponse, successLimit);
  } catch (error) {
    return handleError(error);
  }
}
