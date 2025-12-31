export type ClassValue = string | number | boolean | null | undefined;
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatFileSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

const ACCEPTED_AUDIO_TYPES = new Set([
  "audio/mpeg",
  "audio/wav",
  "audio/x-m4a",
  "audio/mp4",
]);

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export function validateAudioFile(
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

export function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs
    .toString()
    .padStart(2, "0")}`;
}

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export function getAudioLength(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  const minLabel = mins === 1 ? "min" : "mins";
  const secLabel = secs === 1 ? "sec" : "secs";

  if (mins === 0) {
    return `${secs} ${secLabel}`;
  }
  if (secs === 0) {
    return `${mins} ${minLabel}`;
  }

  return {
    getMinutes: (): number => mins,
    getSeconds: (): number => secs,
    toTimestamp: (): string => {
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    },
    toReadable: (): string => `${mins} ${minLabel} ${secs} ${secLabel}`,
  };
}
