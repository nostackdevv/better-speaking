"use client";

import { useState } from "react";
import { MessageSquare, Check, Loader2, AlertCircle, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type FeedbackModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function FeedbackModal({ isOpen, onClose }: FeedbackModalProps) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const characterCount = message.length;
  const maxCharacters = 2000;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    const trimmedMessage = message.trim();

    if (trimmedMessage.length < 10) {
      setError("Please provide at least 10 characters");
      return;
    }

    if (trimmedMessage.length > maxCharacters) {
      setError("Feedback must be less than 2000 characters");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      // Get Web3Forms access key from environment
      const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
      if (!accessKey) {
        setError("Feedback service is not configured");
        setIsSubmitting(false);
        return;
      }

      // Submit to Web3Forms
      const formData = new FormData();
      formData.append("access_key", accessKey);
      formData.append("message", trimmedMessage);
      formData.append("subject", "Speechdeck - User Feedback");

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setMessage("");
      } else {
        setError("Failed to submit feedback. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setMessage("");
    setError("");
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X Close Button */}
        <button
          className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          disabled={isSubmitting}
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          // Success State
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              Thanks for your feedback!
            </h2>
            <p className="text-slate-500 mb-6">
              We appreciate you taking the time to help us improve Speechdeck.
            </p>
            <Button className="w-full" onClick={handleClose}>
              Got it!
            </Button>
          </div>
        ) : (
          // Form State
          <>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <MessageSquare className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Send Feedback</h2>
              <p className="text-slate-400">
                Help us improve your experience
              </p>
            </div>

            <div className="p-6">
              {/* Feedback Form */}
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <textarea
                    className={cn(
                      "w-full px-4 py-3.5 rounded-xl border-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 transition-colors resize-none min-h-[150px]",
                      error
                        ? "border-red-300 bg-red-50"
                        : "border-slate-200"
                    )}
                    disabled={isSubmitting}
                    onChange={(e) => {
                      setMessage(e.target.value);
                      setError("");
                    }}
                    placeholder="Share your thoughts, suggestions, or report issues..."
                    value={message}
                  />

                  {/* Character Counter */}
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      {error && (
                        <p className="text-sm text-red-600 flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          {error}
                        </p>
                      )}
                    </div>
                    <p className={cn(
                      "text-sm",
                      characterCount > maxCharacters
                        ? "text-red-600 font-medium"
                        : "text-slate-400"
                    )}>
                      {characterCount}/{maxCharacters}
                    </p>
                  </div>
                </div>

                <Button
                  className="w-full"
                  disabled={isSubmitting || !message.trim()}
                  size="lg"
                  type="submit"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <MessageSquare className="w-5 h-5" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </form>

              <button
                className="w-full py-3 mt-3 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                disabled={isSubmitting}
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
