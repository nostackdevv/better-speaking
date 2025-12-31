import { TranscribeResponse } from "@/types/api";
import { transcribeAudio } from "./deepgram.service";
import { detectFillers } from "./filler-detection.service";
import { normalizeDeepgramTranscript } from "@/lib/utils/transformers";
import { computeFillerStats } from "@/lib/filler/filler-stats";
import { validateAudioFile } from "@/lib/utils/validators";

export async function processAudioTranscription(
  audioFile: Blob
): Promise<TranscribeResponse> {
  // Step 1: Validate audio file
  validateAudioFile(audioFile);

  // Step 2: Convert to buffer
  const buffer = Buffer.from(await audioFile.arrayBuffer());

  // Step 3: Transcribe with Deepgram
  const { transcript, words, duration } = await transcribeAudio(buffer);

  // Step 4: Normalize words
  const normalizedWords = normalizeDeepgramTranscript({ transcript, words });

  // Step 5: Detect fillers with OpenAI
  const fillers = await detectFillers({
    text: transcript,
    words: normalizedWords.map(({ index, displayText }) => ({
      index,
      text: displayText,
    })),
  });

  // Step 6: Compute statistics
  const fillerStats = computeFillerStats({
    fillers,
    words: normalizedWords,
    duration,
  });

  return {
    transcript,
    words: normalizedWords,
    duration,
    fillers,
    fillerStats,
    createdAt: new Date().toISOString(),
  };
}
