import { useState, useCallback, useRef } from 'react';

import { ApiError, TranscribeResponse } from '@/types/api';

type Status = 'idle' | 'pending' | 'complete' | 'error' | 'no_speech';

interface UseTranscribeAudioOptions {
  onComplete?: (data: TranscribeResponse) => void;
}

export function useTranscribeAudio(options?: UseTranscribeAudioOptions) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<TranscribeResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const onCompleteRef = useRef(options?.onComplete);
  onCompleteRef.current = options?.onComplete;

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

        if (errorData.error === 'no_speech_detected') {
          setStatus('no_speech');
          return;
        }

        throw errorData;
      }

      const result: TranscribeResponse = await response.json();
      setData(result);
      setStatus('complete');
      onCompleteRef.current?.(result);
    } catch (err) {
      setStatus('error');
      if (err && typeof err === 'object' && 'error' in err) {
        setError(err as ApiError);
      } else {
        setError({
          error: err instanceof Error ? err.message : 'Transcription failed',
        });
      }
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
