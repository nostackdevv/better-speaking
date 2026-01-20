'use client';

import { X, Trash2 } from 'lucide-react';
import { useState } from 'react';

import { AnalyticsContextProvider, useAnalyticsContext } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import { StoredSession } from '@/types/domain';
import { getScoreGradient } from '@/utils/scoreGradient';

type HistoryPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  sessions: StoredSession[];
  onClearHistory: () => void;
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatTime24(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export function HistoryPanel({
  isOpen,
  onClose,
  sessions,
  onClearHistory,
}: HistoryPanelProps) {
  const { track } = useAnalyticsContext();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const sortedSessions = [...sessions].reverse();

  const handleClearHistory = () => {
    track((inherited) => ({
      name: 'history_cleared',
      properties: {
        ...inherited,
        sessionCount: sessions.length,
      },
    }));
    onClearHistory();
    setShowConfirm(false);
  };

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), 'History Panel'],
      })}
    >
      <div
        className="fixed inset-0 z-40 bg-slate-950/30 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col overflow-hidden bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 p-4">
          <h2 className="text-lg font-bold text-slate-900">Practice History</h2>
          <div className="flex items-center gap-1">
            {sessions.length > 0 && (
              <button
                className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                onClick={() => setShowConfirm(true)}
                title="Clear history"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}
            <button
              className="cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="border-b border-red-100 bg-red-50 p-4">
            <p className="mb-3 text-sm text-red-700">
              Clear all session history? This cannot be undone.
            </p>
            <div className="flex gap-2">
              <button
                className="cursor-pointer rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-red-600"
                onClick={handleClearHistory}
              >
                Clear All
              </button>
              <button
                className="cursor-pointer rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          {sortedSessions.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-slate-400">No sessions yet</p>
              <p className="mt-2 text-sm text-slate-300">
                Complete a practice session to see your history
              </p>
            </div>
          ) : (
            sortedSessions.map((session) => {
              const clarityScore = session.clarityScore ?? 100;
              const mostUsedFiller = session.topFiller?.text;

              return (
                <div
                  className="rounded-2xl bg-slate-50 p-4 transition-colors hover:bg-slate-100"
                  key={session.id}
                >
                  <div className="mb-3 flex items-start justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-semibold text-slate-900">
                          {formatDate(session.date)}
                        </span>
                        <span className="text-xs text-slate-400">
                          {formatTime24(session.date)}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={cn(
                          'bg-linear-to-r bg-clip-text text-3xl font-bold text-transparent',
                          getScoreGradient(clarityScore)
                        )}
                      >
                        {clarityScore}
                      </span>
                      <span className="ml-1 text-xs text-slate-400">
                        clarity
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-slate-600">
                      <span>
                        <strong>{session.fillerCount}</strong> fillers
                      </span>
                      <span>
                        <strong>{session.wordCount}</strong> words
                      </span>
                    </div>
                    {mostUsedFiller ? (
                      <span className="rounded-md bg-orange-100 px-2 py-1 text-xs font-semibold text-orange-700">
                        {mostUsedFiller}
                      </span>
                    ) : (
                      <span className="rounded-md bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                        Perfect! 🎉
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AnalyticsContextProvider>
  );
}
