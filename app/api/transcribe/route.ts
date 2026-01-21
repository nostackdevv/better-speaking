import { NextRequest, NextResponse } from 'next/server';

import { getDummyResponse } from '@/dummy';
import { BadRequestError, handleError } from '@/lib/errors';
import { checkLimit, addRateLimitHeaders } from '@/lib/middleware/rate-limit';
import { processAudioTranscription } from '@/lib/services/transcription.service';

export async function POST(request: NextRequest) {
  const rateLimit = await checkLimit(request, 'transcribe');
  if (!rateLimit.success) return rateLimit.response!;

  if (false) {
    return NextResponse.json(getDummyResponse());
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get('file');

    if (!(audioFile instanceof Blob)) {
      throw new BadRequestError('Invalid file upload');
    }

    const successLimit = await checkLimit(request, 'transcribeSuccess');
    if (!successLimit.success) return successLimit.response!;

    const result = await processAudioTranscription(audioFile);

    const response = NextResponse.json(result);
    return addRateLimitHeaders(response, successLimit);
  } catch (error) {
    return handleError(error);
  }
}
