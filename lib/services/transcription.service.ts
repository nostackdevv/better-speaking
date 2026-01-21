import { NoSpeechError } from '@/lib/errors';
import { calculateClarityScore } from '@/lib/filler/clarity-score';
import { computeFillerStats } from '@/lib/filler/filler-stats';
import { normalizeDeepgramTranscript } from '@/lib/utils/transformers';
import { TranscribeResponse } from '@/types/api';

import { transcribeAudio } from './deepgram.service';
import { detectFillers } from './filler-detection.service';

export async function processAudioTranscription(
  audioFile: Blob
): Promise<TranscribeResponse> {
  // Convert to buffer
  const buffer = Buffer.from(await audioFile.arrayBuffer());

  // Step 1: Transcribe with Deepgram
  const { transcript, words, duration } = await transcribeAudio(buffer);

  // Step 2: Check for empty transcript (no speech detected)
  if (!transcript || transcript.trim().length === 0) {
    throw new NoSpeechError();
  }

  // Step 3: Normalize words
  const normalizedWords = normalizeDeepgramTranscript({ transcript, words });

  // Step 4: Detect fillers with OpenAI
  const fillers = await detectFillers({
    text: transcript,
    words: words.map(({ word }, index) => ({
      index,
      text: word,
    })),
  });

  // Step 5: Compute statistics
  const fillerStats = computeFillerStats({
    fillers,
    words: normalizedWords,
    duration,
  });

  // Step 6: Calculate clarity score
  const clarityScore = calculateClarityScore(fillerStats, duration);

  return {
    transcript,
    words: normalizedWords,
    duration,
    fillers,
    fillerStats,
    clarityScore,
    createdAt: new Date().toISOString(),
  };
}
