'use client';

import { X } from 'lucide-react';
import { useState } from 'react';

import { FeedbackModal } from './FeedbackModal';

export function FloatingFeedbackButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed right-6 bottom-6 z-60">
        <div className="group relative rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg">
          {/* Close button - positioned at top-right */}
          <button
            aria-label="Close feedback button"
            className="absolute -top-2 -right-2 rounded-full bg-slate-700 p-1 text-white shadow-md transition-colors hover:bg-slate-600"
            onClick={() => setIsVisible(false)}
          >
            <X className="h-3 w-3" />
          </button>

          {/* Feedback button */}
          <button
            className="whitespace-nowrap transition-colors hover:text-slate-300"
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
