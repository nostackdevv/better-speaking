import { NextRequest, NextResponse } from 'next/server';

import { BadRequestError, handleError } from '@/lib/errors';
import { submitFeedback } from '@/lib/services/feedback.service';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      throw new BadRequestError('Message is required');
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 10) {
      throw new BadRequestError('Message must be at least 10 characters');
    }

    if (trimmedMessage.length > 2000) {
      throw new BadRequestError('Message must be less than 2000 characters');
    }

    await submitFeedback({ message: trimmedMessage });

    const response = NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully',
    });
    return response;
  } catch (error) {
    return handleError(error);
  }
}
