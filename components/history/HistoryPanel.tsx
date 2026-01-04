"use client";

import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoredSession } from "@/types/domain";
import { getScoreGradient } from "@/utils/scoreGradient";

type HistoryPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  sessions: StoredSession[];
};

function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

function formatTime24(isoDate: string): string {
  const date = new Date(isoDate);
  return date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

export function HistoryPanel({ isOpen, onClose, sessions }: HistoryPanelProps) {
  if (!isOpen) return null;

  const sortedSessions = [...sessions].reverse(); // Most recent first

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Session History</h2>
          <button
            className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer rounded-lg hover:bg-slate-100 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {sortedSessions.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400">No sessions yet</p>
              <p className="text-sm text-slate-300 mt-2">
                Complete a practice session to see your history
              </p>
            </div>
          ) : (
            sortedSessions.map((session) => {
              const clarityScore = session.clarityScore ?? 100;
              const mostUsedFiller = session.topFiller?.text;

              return (
                <div
                  className="bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors p-4"
                  key={session.id}
                >
                  {/* Date and Score */}
                  <div className="flex items-start justify-between mb-3">
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
                          "text-3xl font-bold bg-linear-to-r bg-clip-text text-transparent",
                          getScoreGradient(clarityScore)
                        )}
                      >
                        {clarityScore}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">clarity</span>
                    </div>
                  </div>

                  {/* Stats Row */}
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
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-md text-xs font-semibold">
                        {mostUsedFiller}
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-xs font-semibold">
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
    </>
  );
}
