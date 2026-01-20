import { useState, useCallback, useRef } from 'react';

import {
  ApiError,
  TranscribeResponse,
  TranscriptionStreamData,
} from '@/types/api';

type StreamStatus =
  | 'idle'
  | 'transcribing'
  | 'analyzing'
  | 'complete'
  | 'error'
  | 'no_speech';

interface UseTranscribeAudioStreamOptions {
  onComplete?: (data: TranscribeResponse) => void;
}

export function useTranscribeAudioStream(
  options?: UseTranscribeAudioStreamOptions
) {
  const [status, setStatus] = useState<StreamStatus>('idle');
  const [data, setData] = useState<Partial<TranscribeResponse>>({});
  const [error, setError] = useState<ApiError | null>(null);
  const onCompleteRef = useRef(options?.onComplete);
  onCompleteRef.current = options?.onComplete;

  const reset = useCallback(() => {
    setStatus('idle');
    setData({});
    setError(null);
  }, []);

  const mutate = useCallback(async (file: File | Blob) => {
    setStatus('transcribing');
    setError(null);
    setData({});

    let accumulatedData: Partial<TranscribeResponse> = {};

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

      const reader = response.body!.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        for (const line of lines) {
          if (!line) continue;

          const chunk: TranscriptionStreamData = JSON.parse(line);

          if (chunk.step === 'transcript') {
            setStatus('analyzing');
            accumulatedData = {
              ...accumulatedData,
              transcript: chunk.transcript,
              words: chunk.words,
              duration: chunk.duration,
            };
            setData(accumulatedData);
          } else if (chunk.step === 'fillers') {
            accumulatedData = {
              ...accumulatedData,
              fillers: chunk.fillers,
            };
            setData(accumulatedData);
          } else if (chunk.step === 'complete') {
            setStatus('complete');
            accumulatedData = {
              ...accumulatedData,
              fillerStats: chunk.fillerStats,
              clarityScore: chunk.clarityScore,
              createdAt: chunk.createdAt,
            };
            setData(accumulatedData);
            onCompleteRef.current?.(accumulatedData as TranscribeResponse);
          } else if (chunk.step === 'error') {
            if (chunk.error === 'no_speech_detected') {
              setStatus('no_speech');
            } else {
              setStatus('error');
              setError({ error: chunk.error });
            }
          }
        }
      }
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
    isTranscribing: status === 'transcribing',
    isAnalyzing: status === 'analyzing',
    isComplete: status === 'complete',
    isError: status === 'error',
    isNoSpeech: status === 'no_speech',
    isPending: status === 'transcribing' || status === 'analyzing',
  };
}
