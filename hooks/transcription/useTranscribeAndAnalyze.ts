import { useState, useCallback, useRef, useEffect } from 'react';

import { ApiError, TranscribeResponse } from '@/types/api';

import { useAnalyze } from './useAnalyze';
import { useTranscribe } from './useTranscribe';

type Status =
  | 'idle'
  | 'transcribing'
  | 'analyzing'
  | 'complete'
  | 'error'
  | 'no_speech';

interface UseTranscribeAndAnalyzeOptions {
  onComplete?: (data: TranscribeResponse) => void;
}

export function useTranscribeAndAnalyze(
  options?: UseTranscribeAndAnalyzeOptions
) {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<TranscribeResponse | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const onCompleteRef = useRef(options?.onComplete);

  useEffect(() => {
    onCompleteRef.current = options?.onComplete;
  }, [options?.onComplete]);

  const transcribe = useTranscribe();
  const analyze = useAnalyze();

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
    transcribe.reset();
    analyze.reset();
  }, [transcribe, analyze]);

  const mutate = useCallback(
    async (file: File | Blob) => {
      setStatus('transcribing');
      setError(null);
      setData(null);

      // Step 1: Transcribe
      const transcriptResult = await transcribe.mutate(file);

      if (!transcriptResult) {
        // Handle no_speech or error from transcribe
        if (transcribe.status === 'no_speech') {
          setStatus('no_speech');
        } else {
          setStatus('error');
          setError(transcribe.error);
        }
        return;
      }

      // Step 2: Analyze
      setStatus('analyzing');
      const analysisResult = await analyze.mutate({
        transcript: transcriptResult.transcript,
        words: transcriptResult.words.map((w) => ({
          index: w.index,
          text: w.displayText,
        })),
        duration: transcriptResult.duration,
      });

      if (!analysisResult) {
        setStatus('error');
        setError(analyze.error);
        return;
      }

      // Combine results
      const combinedResult: TranscribeResponse = {
        transcript: transcriptResult.transcript,
        words: transcriptResult.words,
        duration: transcriptResult.duration,
        fillers: analysisResult.fillers,
        fillerStats: analysisResult.fillerStats,
        clarityScore: analysisResult.clarityScore,
        createdAt: analysisResult.createdAt,
      };

      setData(combinedResult);
      setStatus('complete');
      onCompleteRef.current?.(combinedResult);
    },
    [transcribe, analyze]
  );

  return {
    mutate,
    reset,
    status,
    data,
    error,
    isIdle: status === 'idle',
    isPending: status === 'transcribing' || status === 'analyzing',
    isTranscribing: status === 'transcribing',
    isAnalyzing: status === 'analyzing',
    isComplete: status === 'complete',
    isError: status === 'error',
    isNoSpeech: status === 'no_speech',
  };
}
