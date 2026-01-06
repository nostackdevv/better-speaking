const ACCEPTED_AUDIO_TYPES = new Set([
  "audio/mpeg", // MP3, MP2
  "audio/mp3",
  "audio/mp4", // M4A
  "audio/x-m4a",
  "audio/aac",
  "audio/aacp",
  "audio/wav",
  "audio/wave",
  "audio/x-wav",
  "audio/flac",
  "audio/x-flac",
  "audio/pcm",
  "audio/l16",
  "audio/ogg",
  "audio/opus",
  "audio/webm",
]);

const ACCEPTED_AUDIO_EXTENSIONS = new Set([
  ".mp3",
  ".mp4",
  ".mp2",
  ".aac",
  ".wav",
  ".flac",
  ".pcm",
  ".m4a",
  ".ogg",
  ".oga",
  ".opus",
  ".webm",
]);

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function hasValidAudioExtension(fileName: string): boolean {
  const lowerFileName = fileName.toLowerCase();
  return Array.from(ACCEPTED_AUDIO_EXTENSIONS).some((ext) =>
    lowerFileName.endsWith(ext)
  );
}

export function validateClientAudioFile(
  file: File,
  maxSize: number = MAX_FILE_SIZE
): string | null {
  if (file.size > maxSize) {
    return `File too large. Maximum size is ${maxSize / (1024 * 1024)}MB.`;
  }

  // Check both MIME type and file extension for better mobile browser compatibility
  const hasValidType = ACCEPTED_AUDIO_TYPES.has(file.type);
  const hasValidExtension = hasValidAudioExtension(file.name);

  if (!hasValidType && !hasValidExtension) {
    return "Invalid file type. Please upload MP3, MP4, MP2, AAC, WAV, FLAC, PCM, M4A, Ogg, Opus, or WebM.";
  }

  return null;
}
