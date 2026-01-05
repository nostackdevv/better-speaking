"use client";

import { useEffect } from "react";
import { X, Download, Mic } from "lucide-react";
import type { FillerStatsType, ClarityResult } from "@/types/domain";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    duration: number;
    fillerStats: FillerStatsType;
    clarityScore: ClarityResult | null;
  };
};

export const ShareModal = ({ isOpen, onClose, data }: ShareModalProps) => {
  // Format duration as MM:SS
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Get grade label from score
  const getGrade = (score: number) => {
    if (score >= 90) return { letter: "A", label: "Excellent!" };
    if (score >= 80) return { letter: "B", label: "Great Job!" };
    if (score >= 70) return { letter: "C", label: "Good Progress" };
    if (score >= 60) return { letter: "D", label: "Keep Going" };
    return { letter: "F", label: "Keep Practicing" };
  };

  // Get stats from data
  const audioLength = formatDuration(data.duration);
  const totalWords = data.fillerStats.totalWords;
  const totalFillers = data.fillerStats.totalFillers;
  const mostUsedFiller = data.fillerStats.topFillers[0]?.text || "N/A";
  const clarityScore = data.clarityScore?.score || 0;
  const grade = getGrade(clarityScore);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Placeholder handlers for actions
  const handleDownload = () => {
    // TODO: Implement image download
    console.log("Download image");
  };

  const handleTwitterShare = () => {
    // TODO: Implement Twitter share
    console.log("Share to Twitter");
  };

  const handleInstagramShare = () => {
    // TODO: Implement Instagram share
    console.log("Share to Instagram");
  };

  const handleTikTokShare = () => {
    // TODO: Implement TikTok share
    console.log("Share to TikTok");
  };

  const handleFacebookShare = () => {
    // TODO: Implement Facebook share
    console.log("Share to Facebook");
  };

  if (!isOpen) return null;

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn"
      onClick={handleBackdropClick}
      role="dialog"
    >
      <div className="max-w-sm w-full animate-scaleIn">
        {/* Close button */}
        <div className="flex justify-end mb-3">
          <button
            aria-label="Close modal"
            className="p-2 text-slate-400 hover:text-white cursor-pointer rounded-lg hover:bg-slate-700/50 transition-colors"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Card */}
        <div className="bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-orange-500/20 to-rose-500/20 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-linear-to-tr from-orange-500/10 to-transparent rounded-full blur-xl" />

          <div className="relative">
            {/* Logo & Branding */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white text-lg">
                  SpeakClear
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                I just tracked how much I use filler words
              </p>
            </div>

            {/* Score Display */}
            <div className="text-center mb-5">
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">
                Clarity Score
              </p>
              <p className="text-6xl font-bold text-white mb-2">
                {clarityScore}
              </p>
              <span className="inline-block px-3 py-1 bg-linear-to-r from-orange-500 to-rose-500 text-white text-xs font-semibold rounded-full">
                {grade.letter} · {grade.label}
              </span>
            </div>

            {/* Stats */}
            <div className="space-y-2 mb-5">
              <div className="flex justify-center gap-6 text-center bg-slate-800/50 rounded-xl p-4">
                <div>
                  <p className="text-xl font-bold text-white">{audioLength}</p>
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
              <div className="bg-slate-800/50 rounded-xl p-3 text-center">
                <p className="text-xs text-slate-400">Most used filler</p>
                <p className="text-lg font-bold text-orange-400">
                  &quot;{mostUsedFiller}&quot;
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-slate-700/50 text-center">
              <p className="text-slate-400 text-xs">Beat my score at</p>
              <p className="text-orange-400 font-semibold text-sm">
                speakclear.app
              </p>
            </div>
          </div>
        </div>

        {/* Action icons below card */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {/* Save/Download */}
          <button
            aria-label="Download image"
            className="w-11 h-11 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer transition-colors flex items-center justify-center"
            onClick={handleDownload}
          >
            <Download className="w-5 h-5 text-white" />
          </button>

          {/* X (Twitter) */}
          <button
            aria-label="Share to Twitter"
            className="w-11 h-11 bg-black hover:bg-gray-800 rounded-xl cursor-pointer transition-colors flex items-center justify-center"
            onClick={handleTwitterShare}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </button>

          {/* Instagram */}
          <button
            aria-label="Share to Instagram"
            className="w-11 h-11 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 hover:opacity-90 rounded-xl cursor-pointer transition-colors flex items-center justify-center"
            onClick={handleInstagramShare}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </button>

          {/* TikTok */}
          <button
            aria-label="Share to TikTok"
            className="w-11 h-11 bg-black hover:bg-gray-800 rounded-xl cursor-pointer transition-colors flex items-center justify-center"
            onClick={handleTikTokShare}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          </button>

          {/* Facebook */}
          <button
            aria-label="Share to Facebook"
            className="w-11 h-11 bg-[#1877F2] hover:bg-[#1466d2] rounded-xl cursor-pointer transition-colors flex items-center justify-center"
            onClick={handleFacebookShare}
          >
            <svg
              className="w-4 h-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
