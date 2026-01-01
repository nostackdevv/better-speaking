"use client";

import { X, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDuration } from "@/utils/formatters";

type SessionHistoryItem = {
  id: number;
  date: string;
  time: string;
  duration: number;
  fillerCount: number;
  trend: number;
  prompt: string | null;
};

const mockSessionHistory: SessionHistoryItem[] = [
  {
    id: 1,
    date: "Today",
    time: "2:34 PM",
    duration: 45,
    fillerCount: 8,
    trend: -23,
    prompt: "Tell me about yourself",
  },
  {
    id: 2,
    date: "Yesterday",
    time: "10:15 AM",
    duration: 62,
    fillerCount: 12,
    trend: -5,
    prompt: null,
  },
  {
    id: 3,
    date: "Dec 24",
    time: "4:22 PM",
    duration: 38,
    fillerCount: 6,
    trend: -13,
    prompt: "Pitch a product idea",
  },
];

type HistoryPanelProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelectSession?: (session: SessionHistoryItem) => void;
};

export function HistoryPanel({ isOpen, onClose, onSelectSession }: HistoryPanelProps) {
  if (!isOpen) return null;

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
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {mockSessionHistory.map((session) => (
            <div
              key={session.id}
              onClick={() => {
                onSelectSession?.(session);
                onClose();
              }}
              className="p-4 bg-slate-50 hover:bg-slate-100 rounded-xl cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-slate-900">{session.date}</span>
                  <span className="text-slate-400">·</span>
                  <span className="text-sm text-slate-500">{session.time}</span>
                </div>
                <span
                  className={cn(
                    "text-sm font-semibold",
                    session.trend < 0 ? "text-green-600" : "text-red-500"
                  )}
                >
                  {session.trend < 0
                    ? `↓${Math.abs(session.trend)}%`
                    : `↑${session.trend}%`}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span>{formatDuration(session.duration)}</span>
                <span>{session.fillerCount} fillers</span>
              </div>
              {session.prompt && (
                <p className="mt-2 text-sm text-teal-600 truncate">
                  <MessageCircle className="w-3 h-3 inline mr-1" />
                  {session.prompt}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
