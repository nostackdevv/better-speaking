"use client";

import { useState } from "react";
import { X, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { StoredSession } from "@/types/domain";
import { getScoreGradient } from "@/utils/scoreGradient";

type HistoryPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  sessions: StoredSession[];
  onClearHistory: () => void;
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

export function HistoryPanel({ isOpen, onClose, sessions, onClearHistory }: HistoryPanelProps) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen) return null;

  const sortedSessions = [...sessions].reverse(); // Most recent first

  const handleClearHistory = () => {
    onClearHistory();
    setShowConfirm(false);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-950/30 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Practice History</h2>
          <div className="flex items-center gap-1">
            {sessions.length > 0 && (
              <button
                className="p-2 text-slate-400 hover:text-red-500 cursor-pointer rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => setShowConfirm(true)}
                title="Clear history"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}
            <button
              className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer rounded-lg hover:bg-slate-100 transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {showConfirm && (
          <div className="p-4 bg-red-50 border-b border-red-100">
            <p className="text-sm text-red-700 mb-3">Clear all session history? This cannot be undone.</p>
            <div className="flex gap-2">
              <button
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors cursor-pointer"
                onClick={handleClearHistory}
              >
                Clear All
              </button>
              <button
                className="px-3 py-1.5 text-sm font-medium text-slate-600 bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                onClick={() => setShowConfirm(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}

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
