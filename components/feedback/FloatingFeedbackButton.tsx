"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { FeedbackModal } from "./FeedbackModal";

export function FloatingFeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed bottom-6 right-6 z-60">
        <div className="relative bg-slate-900 text-white text-sm px-4 py-2.5 rounded-lg shadow-lg group">
          {/* Close button - positioned at top-right */}
          <button
            aria-label="Close feedback button"
            className="absolute -top-2 -right-2 bg-slate-700 text-white p-1 rounded-full hover:bg-slate-600 transition-colors shadow-md"
            onClick={() => setIsVisible(false)}
          >
            <X className="w-3 h-3" />
          </button>

          {/* Feedback button */}
          <button
            className="hover:text-slate-300 transition-colors whitespace-nowrap"
            onClick={() => setIsModalOpen(true)}
          >
            Send Feedback
          </button>
        </div>
      </div>

      <FeedbackModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
