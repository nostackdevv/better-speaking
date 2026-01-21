import { NextRequest, NextResponse } from 'next/server';

import { getDummyAnalysis } from '@/dummy';
import { BadRequestError, handleError } from '@/lib/errors';
import { checkLimit, addRateLimitHeaders } from '@/lib/middleware/rate-limit';
import { analyzeTranscript } from '@/lib/services/transcription.service';
import { AnalyzeRequest } from '@/types/api';

export async function POST(request: NextRequest) {
  const rateLimit = await checkLimit(request, 'analyze');
  if (!rateLimit.success) return rateLimit.response!;

  if (false) {
    return NextResponse.json(getDummyAnalysis());
  }

  try {
    const body: AnalyzeRequest = await request.json();

    if (!body.transcript || !body.words || body.duration === undefined) {
      throw new BadRequestError(
        'Missing required fields: transcript, words, duration'
      );
    }

    const successLimit = await checkLimit(request, 'analyzeSuccess');
    if (!successLimit.success) return successLimit.response!;

    const result = await analyzeTranscript(body);

    const response = NextResponse.json(result);
    return addRateLimitHeaders(response, successLimit);
  } catch (error) {
    return handleError(error);
  }
}
