import { createClient } from "@deepgram/sdk";

import { config } from "@/lib/config";
import { TranscriptionResult } from "@/lib/interfaces/transcription.interface";

const deepgramClient = createClient(config.deepgram.apiKey);

export async function transcribeAudio(
  buffer: Buffer
): Promise<TranscriptionResult> {
  const { result } = await deepgramClient.listen.prerecorded.transcribeFile(
    buffer,
    {
      model: config.deepgram.model,
      filler_words: config.deepgram.options.filler_words,
      punctuate: config.deepgram.options.punctuate,
    }
  );

  if (!result?.results?.channels?.[0]?.alternatives?.[0]) {
    throw new Error("Invalid transcription result from Deepgram");
  }

  const { transcript, words } = result.results.channels[0].alternatives[0];
  const { duration } = result.metadata;

  return { transcript, words, duration };
}
