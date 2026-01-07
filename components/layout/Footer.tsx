"use client";

import { useState } from "react";
import { FeedbackModal } from "@/components/feedback/FeedbackModal";
import { Mic, Heart } from "lucide-react";
import { ROUTES } from "@/lib/routes";
import Link from "next/link";
import { WaitlistModal } from "../waitlist/WaitlistModal";

export function Footer() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-slate-900"></div>
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="col-span-2">
            <Link
              aria-label="Speechdeck home"
              className="inline-flex items-center gap-3"
              href={ROUTES.home}
            >
              <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center">
                <Mic className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">Speechdeck</span>
            </Link>
            <p className="text-slate-400 mb-6 leading-relaxed">
              Track how much filler words you use, eliminate it, and speak with
              confidence in every conversation.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
                  onClick={() => setIsFeedbackModalOpen(true)}
                >
                  Send Feedback
                </button>
              </li>

              <li>
                <button
                  className="text-slate-400 hover:text-orange-400 transition-colors cursor-pointer"
                  onClick={() => setIsWaitlistModalOpen(true)}
                >
                  Join the pro waitlist
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="text-slate-400 hover:text-orange-400 transition-colors"
                  href={ROUTES.legal.privacy}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 hover:text-orange-400 transition-colors"
                  href={ROUTES.legal.terms}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Speechdeck. All rights reserved.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-2">
            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />{" "}
            in London
          </p>
        </div>
      </div>
      {isFeedbackModalOpen && (
        <FeedbackModal
          isOpen={isFeedbackModalOpen}
          onClose={() => setIsFeedbackModalOpen(false)}
        />
      )}
      {isWaitlistModalOpen && (
        <WaitlistModal
          isOpen={isWaitlistModalOpen}
          onClose={() => setIsWaitlistModalOpen(false)}
        />
      )}
    </footer>
  );
}
