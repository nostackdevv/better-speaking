import { config } from "@/lib/config";

export function validateAudioFile(file: Blob): void {
  // Validate file size
  if (file.size > config.audio.maxFileSizeBytes) {
    const maxMB = config.audio.maxFileSizeBytes / (1024 * 1024);
    throw new Error(`File size exceeds maximum of ${maxMB}MB`);
  }

  // Validate MIME type
  if (file.type && !config.audio.allowedMimeTypes.includes(file.type as any)) {
    throw new Error(
      `Invalid file type: ${file.type}. Allowed types: ${config.audio.allowedMimeTypes.join(", ")}`
    );
  }

  // Note: We can't easily validate duration without decoding the audio file,
  // so we rely on the 10MB file size limit as a proxy for the 2-minute limit
}
