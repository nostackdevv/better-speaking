import { calculateClarityScore } from '@/lib/filler/clarity-score';
import { computeFillerStats } from '@/lib/filler/filler-stats';
import { normalizeDeepgramTranscript } from '@/lib/utils/transformers';
import {
  AnalysisResult,
  AnalyzeRequest,
  TranscribeResponse,
  TranscriptionOnlyResult,
} from '@/types/api';

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
    return {
      transcript: '',
      words: [],
      duration,
      fillers: [],
      fillerStats: {
        totalFillers: 0,
        totalWords: 0,
        fillerPercentage: 0,
        fillersPerMinute: 0,
        topFillers: [],
      },
      clarityScore: null,
      createdAt: new Date().toISOString(),
    };
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

/**
 * Transcription only - returns transcript without filler analysis
 */
export async function transcribeAudioOnly(
  audioFile: Blob
): Promise<TranscriptionOnlyResult> {
  const buffer = Buffer.from(await audioFile.arrayBuffer());
  const { transcript, words, duration } = await transcribeAudio(buffer);

  if (!transcript || transcript.trim().length === 0) {
    return {
      transcript: '',
      words: [],
      duration,
      createdAt: new Date().toISOString(),
    };
  }

  const normalizedWords = normalizeDeepgramTranscript({ transcript, words });

  return {
    transcript,
    words: normalizedWords,
    duration,
    createdAt: new Date().toISOString(),
  };
}

/**
 * Analysis only - takes transcript and returns filler analysis
 */
export async function analyzeTranscript(
  input: AnalyzeRequest
): Promise<AnalysisResult> {
  const { transcript, words, duration } = input;

  const fillers = await detectFillers({
    text: transcript,
    words,
  });

  const fillerStats = computeFillerStats({
    fillers,
    words: words.map((w, index) => ({
      index,
      displayText: w.text,
      startChar: 0,
      endChar: 0,
      confidence: 1,
    })),
    duration,
  });

  const clarityScore = calculateClarityScore(fillerStats, duration);

  return {
    fillers,
    fillerStats,
    clarityScore,
    createdAt: new Date().toISOString(),
  };
}
