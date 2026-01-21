import { NextRequest, NextResponse } from 'next/server';

import { getDummyTranscription } from '@/dummy';
import { BadRequestError, handleError } from '@/lib/errors';
import { checkLimit, addRateLimitHeaders } from '@/lib/middleware/rate-limit';
import { transcribeAudioOnly } from '@/lib/services/transcription.service';

export async function POST(request: NextRequest) {
  const rateLimit = await checkLimit(request, 'transcribe');
  if (!rateLimit.success) return rateLimit.response!;

  if (false) {
    return NextResponse.json(getDummyTranscription());
  }

  try {
    const formData = await request.formData();
    const audioFile = formData.get('file');

    if (!(audioFile instanceof Blob)) {
      throw new BadRequestError('Invalid file upload');
    }

    const result = await transcribeAudioOnly(audioFile);

    const response = NextResponse.json(result);
    return addRateLimitHeaders(response, rateLimit);
  } catch (error) {
    return handleError(error);
  }
}
