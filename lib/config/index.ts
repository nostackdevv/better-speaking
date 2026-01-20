export const config = {
  deepgram: {
    apiKey: process.env.DEEPGRAM_API_KEY!,
    model: 'nova-2' as const,
    options: {
      filler_words: true,
      punctuate: true,
    },
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
    model: 'gpt-5.1' as const,
    temperature: 0,
    maxOutputTokens: 1100,
  },
  audio: {
    maxFileSizeBytes: 10 * 1024 * 1024, // 10MB
    maxDurationSeconds: 120, // 2 minutes
    allowedMimeTypes: [
      'audio/wav',
      'audio/mpeg',
      'audio/mp3',
      'audio/webm',
      'audio/mp4',
      'audio/m4a',
      'audio/ogg',
    ] as const,
  },
} as const;

// Validate environment variables on startup
function validateEnv() {
  const required = ['DEEPGRAM_API_KEY', 'OPENAI_API_KEY'];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}`
    );
  }
}

// Only validate in server-side contexts
if (typeof window === 'undefined') {
  validateEnv();
}
