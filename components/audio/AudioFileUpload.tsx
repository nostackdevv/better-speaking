'use client';

import { Upload, FileAudio, Trash, AlertCircle, Loader2 } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';

import { AudioItemCard } from '@/components/history/AudioItemCard';
import { Button } from '@/components/ui/Button';
import { AnalyticsContextProvider, useAnalyticsContext } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import {
  validateClientAudioFile,
  MAX_FILE_SIZE,
  AUDIO_ACCEPT_STRING,
} from '@/utils/audio/validators';
import { formatBytesToSize } from '@/utils/formatters';

type AudioFileUploadProps = {
  isAnalyzing?: boolean;
  onAnalyze?: (file: File) => void;
  accept?: string;
  maxSize?: number;
};

export function AudioFileUpload({
  isAnalyzing = false,
  onAnalyze,
  maxSize = MAX_FILE_SIZE,
}: AudioFileUploadProps) {
  const { track } = useAnalyticsContext();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [isLoadingDuration, setIsLoadingDuration] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!selectedFile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset duration when file is cleared
      setDuration(0);
      return;
    }

    setIsLoadingDuration(true);
    const audio = new Audio();
    const url = URL.createObjectURL(selectedFile);

    audio.addEventListener('loadedmetadata', () => {
      const fileDuration = Math.floor(audio.duration);
      setDuration(fileDuration);
      setIsLoadingDuration(false);
      URL.revokeObjectURL(url);

      track((inherited) => ({
        name: 'file_uploaded',
        properties: {
          ...inherited,
          fileSize: selectedFile.size,
          fileType:
            selectedFile.type ||
            selectedFile.name.split('.').pop() ||
            'unknown',
          duration: fileDuration,
        },
      }));
    });

    audio.addEventListener('error', () => {
      setError('Unable to read audio file duration');
      setIsLoadingDuration(false);
      URL.revokeObjectURL(url);
    });

    audio.src = url;

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [selectedFile, track]);

  const handleAudioFileUpload = (file: File) => {
    const validationError = validateClientAudioFile(file, maxSize);
    if (validationError) {
      track((inherited) => ({
        name: 'file_upload_error',
        properties: {
          ...inherited,
          error: validationError,
          fileType: file.type || file.name.split('.').pop() || 'unknown',
          fileSize: file.size,
        },
      }));
      setError(validationError);
      return;
    }
    setError(null);
    setSelectedFile(file);
  };

  const handleDeleteAudio = () => {
    if (selectedFile) {
      track((inherited) => ({
        name: 'file_removed',
        properties: {
          ...inherited,
          fileSize: selectedFile.size,
        },
      }));
    }
    setSelectedFile(null);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleAudioFileUpload(file);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      track((inherited) => ({
        name: 'analysis_started',
        properties: {
          ...inherited,
          inputSource: 'upload',
          duration,
        },
      }));
      onAnalyze?.(selectedFile);
    }
  };

  if (selectedFile) {
    const isValidDuration = duration >= 10 && duration <= 300;
    const isTooShort = duration > 0 && duration < 10;
    const isTooLong = duration > 300;

    return (
      <AnalyticsContextProvider
        getProperties={(inherited) => ({
          ...inherited,
          source: [...(inherited.source ?? []), 'File Upload'],
        })}
      >
        <div className="flex flex-col gap-3">
          <AudioItemCard
            icon={FileAudio}
            onRemove={handleDeleteAudio}
            removeIcon={Trash}
            removeLabel="Delete audio file"
            subtitle={formatBytesToSize(selectedFile.size)}
            title={selectedFile.name}
            truncateTitle
          />

          {isTooShort && !isLoadingDuration && (
            <div
              className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>
                Audio must be at least 10 seconds (currently {duration}s)
              </span>
            </div>
          )}

          {isTooLong && !isLoadingDuration && (
            <div
              className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              role="alert"
            >
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Audio exceeds maximum length of 5 minutes</span>
            </div>
          )}

          <Button
            disabled={!isValidDuration || isLoadingDuration || isAnalyzing}
            onClick={handleAnalyze}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : isLoadingDuration ? (
              'Checking duration...'
            ) : (
              'Analyze Recording'
            )}
          </Button>
        </div>
      </AnalyticsContextProvider>
    );
  }

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), 'File Upload'],
      })}
    >
      <div>
        <div
          aria-label="Upload audio file"
          className={cn(
            'group flex cursor-pointer flex-col items-center rounded-2xl border-2 border-dashed px-8 py-16 transition-all',
            'border-slate-300 hover:border-orange-400 hover:bg-orange-50/30'
          )}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
        >
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-slate-100 transition-colors group-hover:bg-orange-100">
            <Upload
              aria-hidden="true"
              className="h-10 w-10 text-slate-400 transition-colors group-hover:text-orange-500"
            />
          </div>
          <p className="mb-1 text-lg font-semibold text-slate-700">
            Drop your audio file here
          </p>
          <p className="mb-4 text-slate-500">or click to browse</p>
          <p className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs text-slate-400">
            Add any valid audio file • Max 10
          </p>

          <input
            accept={AUDIO_ACCEPT_STRING}
            aria-hidden="true"
            className="hidden"
            onChange={handleInputChange}
            ref={inputRef}
            type="file"
          />
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    </AnalyticsContextProvider>
  );
}
