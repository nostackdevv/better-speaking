/**
 * Formats a number of bytes into a human-readable file size string.
 * @param bytes - The number of bytes to format
 * @returns A formatted string like "1.5 MB", "500 KB", or "128 B"
 */
export function formatBytesToSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Formats seconds into a timestamp string (MM:SS format).
 * Handles edge cases like non-finite numbers and negative values.
 * @param seconds - The duration in seconds
 * @returns A formatted timestamp like "3:45" or "0:00"
 */
export function formatSecondsToTimestamp(seconds: number): string {
  if (!isFinite(seconds) || seconds < 0) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Formats seconds into a duration string (M:SS format).
 * Similar to formatSecondsToTimestamp but without padding minutes.
 * @param seconds - The duration in seconds
 * @returns A formatted duration like "3:45" or "0:05"
 */
export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}
