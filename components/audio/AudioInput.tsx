'use client';

import { Mic, Upload } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import { Card } from '@/components/ui/Card';
import { AnalyticsContextProvider, useAnalyticsContext } from '@/lib/analytics';

import { AudioFileUpload } from './AudioFileUpload';
import { AudioRecorder } from './AudioRecorder';

export function AudioInput({
  isAnalyzing = false,
  onUpload,
}: {
  isAnalyzing?: boolean;
  onUpload?: (file: File | Blob) => void;
}) {
  const { track } = useAnalyticsContext();
  const [mode, setMode] = useState<'record' | 'upload'>('record');

  const handleModeChange = (newMode: 'record' | 'upload') => {
    if (newMode !== mode) {
      track((inherited) => ({
        name: 'mode_switched',
        properties: {
          ...inherited,
          from: mode,
          to: newMode,
        },
      }));
      setMode(newMode);
    }
  };

  const handleAnalyze = (file: File | Blob) => {
    if (onUpload) {
      onUpload(file);
    }
  };

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), 'Audio Input'],
      })}
    >
      <Card className="p-6">
        <div
          aria-label="Audio input method"
          className="mx-auto mb-6 flex max-w-xs gap-2 rounded-xl bg-slate-100 p-1.5"
          role="tablist"
        >
          <button
            aria-selected={mode === 'record'}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              mode === 'record'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => handleModeChange('record')}
            role="tab"
          >
            <Mic className="h-4 w-4" /> Record
          </button>
          <button
            aria-selected={mode === 'upload'}
            className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
              mode === 'upload'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
            onClick={() => handleModeChange('upload')}
            role="tab"
          >
            <Upload className="h-4 w-4" /> Upload
          </button>
        </div>

        {mode === 'record' && (
          <AudioRecorder isAnalyzing={isAnalyzing} onAnalyze={handleAnalyze} />
        )}

        {mode === 'upload' && (
          <AudioFileUpload
            isAnalyzing={isAnalyzing}
            onAnalyze={handleAnalyze}
          />
        )}
        <div className="mt-3 space-y-0.5 text-center text-xs text-slate-500">
          <p>Your audio is processed securely and never stored.</p>
          <p>
            <Link
              className="font-medium text-orange-500 hover:underline"
              href="/legal/privacy"
            >
              Learn how we protect your privacy
            </Link>
          </p>
        </div>
      </Card>
    </AnalyticsContextProvider>
  );
}
