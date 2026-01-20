'use client';

import { X, Download, Mic, Share2, Check } from 'lucide-react';
import { useEffect, useState } from 'react';

import { getArchetype } from '@/constants/archetypes';
import { useShareResults } from '@/hooks/share/useShareResults';
import { useIsMobile } from '@/hooks/ui/useIsMobile';
import { AnalyticsContextProvider, useAnalyticsContext } from '@/lib/analytics';
import type { FillerStatsType, ClarityResult } from '@/types/domain';

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    duration: number;
    fillerStats: FillerStatsType;
    clarityScore: ClarityResult | null;
  };
};

const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const ShareModal = ({ isOpen, onClose, data }: ShareModalProps) => {
  const { track } = useAnalyticsContext();
  const isMobile = useIsMobile();
  const [toast, setToast] = useState({ message: '', isVisible: false });
  const { shareResults, isSharing } = useShareResults();

  const audioLength = formatDuration(data.duration);
  const totalWords = data.fillerStats.totalWords;
  const totalFillers = data.fillerStats.totalFillers;
  const mostUsedFiller = data.fillerStats.topFillers[0]?.text || 'N/A';
  const clarityScore = data.clarityScore?.score || 0;
  const archetype = getArchetype(clarityScore);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: '', isVisible: false }), 3000);
  };

  const getShareImageUrl = () => {
    const params = new URLSearchParams({
      score: clarityScore.toString(),
      fillers: totalFillers.toString(),
      words: totalWords.toString(),
      duration: audioLength,
      topFiller: mostUsedFiller,
      archetype: archetype.label,
    });
    return `/api/share-image?${params.toString()}`;
  };

  const handleShare = async () => {
    const canShare =
      typeof navigator.canShare === 'function' && navigator.canShare();
    const method = canShare ? 'native_share' : 'clipboard';
    try {
      await shareResults({
        score: clarityScore,
        fillers: totalFillers,
        words: totalWords,
        duration: audioLength,
        topFiller: mostUsedFiller,
        archetype: archetype.label,
      });

      track((inherited) => ({
        name: 'result_shared',
        properties: {
          ...inherited,
          method,
          clarityScore,
          archetype: archetype.label,
          device: isMobile ? 'mobile' : 'desktop',
        },
      }));

      if (!canShare) {
        showToast('Image copied! Paste it anywhere.');
      }
    } catch (err) {
      if (err instanceof Error && err.name !== 'AbortError') {
        track((inherited) => ({
          name: 'share_error',
          properties: {
            ...inherited,
            method,
            error: err.message,
          },
        }));
        showToast('Failed to share. Try downloading instead.');
      }
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = getShareImageUrl();
    link.download = 'speecha-results.png';
    link.click();

    track((inherited) => ({
      name: 'result_shared',
      properties: {
        ...inherited,
        method: 'download',
        clarityScore,
        archetype: archetype.label,
        device: isMobile ? 'mobile' : 'desktop',
      },
    }));

    showToast('Image saved!');
  };

  if (!isOpen) return null;

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), 'Share Modal'],
      })}
    >
      <div
        aria-modal="true"
        className="animate-fadeIn fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-4 backdrop-blur-sm"
        onClick={handleBackdropClick}
        role="dialog"
      >
        <div className="animate-scaleIn w-full max-w-sm">
          <div className="mb-3 flex justify-end">
            <button
              aria-label="Close modal"
              className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-700/50 hover:text-white"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-6">
            <div className="absolute top-0 right-0 h-32 w-32 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 h-24 w-24 rounded-full blur-xl" />

            <div className="relative">
              <div className="mb-4 flex flex-col items-center text-center">
                <div className="mb-2 flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600">
                    <Mic className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    Speecha
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">
                  I just tracked how much filler words I use
                </p>
              </div>

              <div className="mb-5 text-center">
                <p className="mb-1 text-xs tracking-wider text-slate-400 uppercase">
                  Clarity Score
                </p>
                <p className="mb-2 text-6xl font-bold text-white">
                  {clarityScore}
                </p>
                <span
                  className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
                  style={{ backgroundColor: archetype.color }}
                >
                  {archetype.label}
                </span>
              </div>

              <div className="mb-5 space-y-2">
                <div className="flex justify-center gap-6 rounded-xl bg-slate-800/50 p-4 text-center">
                  <div>
                    <p className="text-xl font-bold text-white">
                      {audioLength}
                    </p>
                    <p className="text-xs text-slate-400">Duration</p>
                  </div>
                  <div className="w-px bg-slate-700" />
                  <div>
                    <p className="text-xl font-bold text-white">{totalWords}</p>
                    <p className="text-xs text-slate-400">Words</p>
                  </div>
                  <div className="w-px bg-slate-700" />
                  <div>
                    <p className="text-xl font-bold text-orange-400">
                      {totalFillers}
                    </p>
                    <p className="text-xs text-slate-400">Fillers</p>
                  </div>
                </div>
                <div className="rounded-xl bg-slate-800/50 p-3 text-center">
                  <p className="text-xs text-slate-400">Most used filler</p>
                  <p className="text-lg font-bold text-orange-400">
                    &quot;{mostUsedFiller}&quot;
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-700/50 pt-4 text-center">
                <p className="text-xs text-slate-400">Beat my score at</p>
                <p className="text-sm font-semibold text-orange-400">
                  speecha.app
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            {isMobile && (
              <>
                <button
                  aria-label="Share results"
                  className="flex h-11 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 font-medium text-white transition-colors hover:from-orange-600 hover:to-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                  disabled={isSharing}
                  onClick={handleShare}
                >
                  <Share2 className="h-5 w-5" />
                  {isSharing ? 'Sharing...' : 'Share'}
                </button>

                <button
                  aria-label="Download image"
                  className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-slate-700 transition-colors hover:bg-slate-600"
                  onClick={handleDownload}
                >
                  <Download className="h-5 w-5 text-white" />
                </button>
              </>
            )}
            {!isMobile && (
              <button
                aria-label="Save results"
                className="flex h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-linear-to-r from-orange-500 to-rose-500 font-medium text-white transition-colors hover:from-orange-600 hover:to-rose-600"
                onClick={handleDownload}
              >
                <Download className="h-5 w-5" />
                Save Image
              </button>
            )}
          </div>
        </div>

        {toast.isVisible && (
          <div className="animate-fade-in fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl bg-slate-800 px-4 py-3 text-white shadow-lg">
            <Check className="h-4 w-4 text-emerald-400" />
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
        )}
      </div>
    </AnalyticsContextProvider>
  );
};
