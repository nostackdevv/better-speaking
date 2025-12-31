import { DeepgramWord } from "@/types/external/deepgram";

export interface TranscriptionResult {
  transcript: string;
  words: DeepgramWord[];
  duration: number;
}

export interface ITranscriptionProvider {
  transcribe(buffer: Buffer): Promise<TranscriptionResult>;
}
