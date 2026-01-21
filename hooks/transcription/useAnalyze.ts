import { useState, useCallback } from 'react';

import { ApiError, AnalyzeRequest, AnalysisResult } from '@/types/api';

type Status = 'idle' | 'pending' | 'complete' | 'error';

export function useAnalyze() {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<ApiError | null>(null);

  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);

  const mutate = useCallback(async (input: AnalyzeRequest) => {
    setStatus('pending');
    setError(null);
    setData(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) {
        const errorData: ApiError = await response.json();
        throw errorData;
      }

      const result: AnalysisResult = await response.json();
      setData(result);
      setStatus('complete');
      return result;
    } catch (err) {
      setStatus('error');
      if (err && typeof err === 'object' && 'error' in err) {
        setError(err as ApiError);
      } else {
        setError({
          error: err instanceof Error ? err.message : 'Analysis failed',
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
  };
}
