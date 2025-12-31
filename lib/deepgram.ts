// Re-export from the new service location for backward compatibility
export { transcribeAudio as getDeepgramTranscription } from "./services/deepgram.service";
export type { TranscriptionResult } from "./interfaces/transcription.interface";
