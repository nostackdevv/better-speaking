"use client";

import { useState } from "react";
import { FeedbackModal } from "@/components/feedback/FeedbackModal";

export function Footer() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  return (
    <>
      <footer className="text-center pt-4 mt-8 pb-24 border-t border-gray-200">
        <p className="text-sm text-gray-400 mb-2">Practice makes progress 🎯</p>
        <button
          className="text-sm text-gray-500 hover:text-gray-700 underline transition-colors cursor-pointer"
          onClick={() => setIsFeedbackOpen(true)}
        >
          Send Feedback
        </button>
      </footer>

      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
      />
    </>
  );
}
