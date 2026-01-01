"use client";

import { useState } from "react";
import { Crown, Check, Mail, Loader2, Bell, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useWaitlist } from "@/hooks/useWaitlist";
import { cn } from "@/lib/utils";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const { joinWaitlist, status, errorMessage, reset } = useWaitlist();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!isValidEmail(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    setLocalError("");
    await joinWaitlist(email);
  };

  const handleClose = () => {
    setEmail("");
    setLocalError("");
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl">
        {status === "success" ? (
          // Success State
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              You&apos;re on the list!
            </h2>
            <p className="text-slate-500 mb-6">
              We&apos;ll email you when Pro is ready. Get excited for unlimited
              sessions, detailed analytics, and more.
            </p>
            <Button variant="primary" className="w-full" onClick={handleClose}>
              Got it!
            </Button>
          </div>
        ) : (
          // Form State
          <>
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <h2 className="text-2xl font-bold">Pro Coming Soon</h2>
                <Badge variant="comingSoon" className="text-[10px] px-2 py-0.5">
                  COMING SOON
                </Badge>
              </div>
              <p className="text-slate-400">
                Be the first to know when we launch
              </p>
            </div>

            <div className="p-6">
              {/* Features List */}
              <div className="space-y-3 mb-6">
                {[
                  "Unlimited practice sessions",
                  "All challenge categories",
                  "Advanced analytics & trends",
                  "Export & share results",
                  "Priority support",
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Email Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setLocalError("");
                      }}
                      placeholder="Enter your email"
                      className={cn(
                        "w-full pl-12 pr-4 py-3.5 rounded-xl border-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors",
                        (localError || errorMessage)
                          ? "border-red-300 bg-red-50"
                          : "border-slate-200"
                      )}
                      disabled={status === "loading"}
                    />
                  </div>
                  {(localError || errorMessage) && (
                    <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {localError || errorMessage}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  size="lg"
                  disabled={status === "loading" || !email.trim()}
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <Bell className="w-5 h-5" />
                      Join the Waitlist
                    </>
                  )}
                </Button>
              </form>

              <button
                onClick={handleClose}
                className="w-full py-3 mt-3 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors"
                disabled={status === "loading"}
              >
                Maybe later
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
