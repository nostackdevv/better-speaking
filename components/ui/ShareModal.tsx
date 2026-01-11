"use client";

import { useEffect, useState } from "react";
import { X, Download, Mic, Share2, Check } from "lucide-react";
import type { FillerStatsType, ClarityResult } from "@/types/domain";
import { useShareResults } from "@/hooks/share/useShareResults";
import { useIsMobile } from "@/hooks/ui/useIsMobile";
import { getArchetype } from "@/constants/archetypes";

type ShareModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: {
    duration: number;
    fillerStats: FillerStatsType;
    clarityScore: ClarityResult | null;
  };
};

// Format duration as MM:SS
const formatDuration = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const ShareModal = ({ isOpen, onClose, data }: ShareModalProps) => {
  const isMobile = useIsMobile();
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const { shareResults, isSharing } = useShareResults();

  // Get stats from data
  const audioLength = formatDuration(data.duration);
  const totalWords = data.fillerStats.totalWords;
  const totalFillers = data.fillerStats.totalFillers;
  const mostUsedFiller = data.fillerStats.topFillers[0]?.text || "N/A";
  const clarityScore = data.clarityScore?.score || 0;
  const archetype = getArchetype(clarityScore);

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

  const showToast = (message: string) => {
    setToast({ message, isVisible: true });
    setTimeout(() => setToast({ message: "", isVisible: false }), 3000);
  };

  // Generate image URL with params
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

  // Main share handler
  const handleShare = async () => {
    try {
      await shareResults({
        score: clarityScore,
        fillers: totalFillers,
        words: totalWords,
        duration: audioLength,
        topFiller: mostUsedFiller,
        archetype: archetype.label,
      });

      // Show toast for desktop (clipboard copy)
      if (!navigator.canShare) {
        showToast("Image copied! Paste it anywhere.");
      }
    } catch (err) {
      // Only show error if it's not user cancellation
      if (err instanceof Error && err.name !== "AbortError") {
        showToast("Failed to share. Try downloading instead.");
      }
    }
  };

  // Download handler
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = getShareImageUrl();
    link.download = "speechdeck-results.png";
    link.click();
    showToast("Image saved!");
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
        <div className="bg-slate-900 rounded-3xl p-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24  rounded-full blur-xl" />

          <div className="relative">
            {/* Logo & Branding */}
            <div className="flex flex-col items-center text-center mb-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500 to-rose-500 flex items-center justify-center">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <span className="font-semibold text-white text-lg">
                  Speechdeck
                </span>
              </div>
              <p className="text-slate-400 text-sm mt-1">
                I just tracked how much filler words I use
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
                {archetype.label}
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
                speechdeck.app
              </p>
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center justify-center gap-3 mt-4">
          {isMobile && (
            <>
              <button
                aria-label="Share results"
                className="flex-1 h-11 bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2 text-white font-medium"
                disabled={isSharing}
                onClick={handleShare}
              >
                <Share2 className="w-5 h-5" />
                {isSharing ? "Sharing..." : "Share"}
              </button>

              {/* Download button - Mobile/Tablet */}
              <button
                aria-label="Download image"
                className="w-11 h-11 bg-slate-700 hover:bg-slate-600 rounded-xl cursor-pointer transition-colors flex items-center justify-center"
                onClick={handleDownload}
              >
                <Download className="w-5 h-5 text-white" />
              </button>
            </>
          )}
          {!isMobile && (
            /* Save Result button - Desktop only */
            <button
              aria-label="Save results"
              className="w-full h-11 bg-linear-to-r from-orange-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 rounded-xl cursor-pointer transition-colors flex items-center justify-center gap-2 text-white font-medium"
              onClick={handleDownload}
            >
              <Download className="w-5 h-5" />
              Save Result
            </button>
          )}
        </div>
      </div>

      {/* Toast notification */}
      {toast.isVisible && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium">{toast.message}</span>
        </div>
      )}
    </div>
  );
};
