import { useState, useCallback } from 'react';

import { ApiError, TranscriptionOnlyResult } from '@/types/api';

type Status = 'idle' | 'pending' | 'complete' | 'error' | 'no_speech';

export function useTranscribe() {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<TranscriptionOnlyResult | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  const mutate = useCallback(async (file: File | Blob) => {
    setStatus('pending');
    setError(null);
    setData(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw errorData;
      }

      const result: TranscriptionOnlyResult = await response.json();

      if (!result.transcript) {
        setStatus('no_speech');
        return { noSpeech: true as const };
      }

      setData(result);
      setStatus('complete');
      return result;
    } catch (err) {
      setStatus('error');
      if (err && typeof err === 'object' && 'error' in err) {
        setError(err as ApiError);
      } else {
        setError({
          error: err instanceof Error ? err.message : 'Transcription failed',
        });
      }
      return null;
    }
  }, []);

  return {
    mutate,
    reset,
    status,
    data,
    error,
    isIdle: status === 'idle',
    isPending: status === 'pending',
    isComplete: status === 'complete',
    isError: status === 'error',
    isNoSpeech: status === 'no_speech',
  };
}
