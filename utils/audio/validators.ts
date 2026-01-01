const ACCEPTED_AUDIO_TYPES = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/x-m4a",
  "audio/mp4",
]);

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateClientAudioFile(
  file: File,
  maxSize: number = MAX_FILE_SIZE
): string | null {
  if (!ACCEPTED_AUDIO_TYPES.has(file.type)) {
    return "Invalid file type. Please upload MP3, WAV, or M4A.";
  }
  if (file.size > maxSize) {
    return `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`;
  }
  return null;
}
