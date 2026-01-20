import { calculateClarityScore } from "@/lib/filler/clarity-score";
import { computeFillerStats } from "@/lib/filler/filler-stats";
import { normalizeDeepgramTranscript } from "@/lib/utils/transformers";
import { TranscribeResponse } from "@/types/api";

import { transcribeAudio } from "./deepgram.service";
import { detectFillers } from "./filler-detection.service";

export async function processAudioTranscription(
  audioFile: Blob
): Promise<TranscribeResponse> {
  // Convert to buffer
  const buffer = Buffer.from(await audioFile.arrayBuffer());

  // Step 3: Transcribe with Deepgram
  const { transcript, words, duration } = await transcribeAudio(buffer);

  // Step 4: Normalize words
  const normalizedWords = normalizeDeepgramTranscript({ transcript, words });

  // Step 5: Detect fillers with OpenAI
  const fillers = await detectFillers({
    text: transcript,
    words: words.map(({ word }, index) => ({
      index,
      text: word,
    })),
  });

  // Step 6: Compute statistics
  const fillerStats = computeFillerStats({
    fillers,
    words: normalizedWords,
    duration,
  });

  // Step 7: Calculate clarity score
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
