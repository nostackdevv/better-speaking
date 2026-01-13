"use client";

import { useState, useEffect } from "react";
import {
  Crown,
  Check,
  Mail,
  Loader2,
  Bell,
  AlertCircle,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useJoinWaitlist } from "@/hooks/waitlist/useJoinWaitlist";
import { cn } from "@/lib/utils";
import { AnalyticsContextProvider, useAnalyticsContext } from "@/lib/analytics";

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trigger?: "pro_badge" | "challenge_mode" | "feature_gate";
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WaitlistModal({
  isOpen,
  onClose,
  trigger = "pro_badge",
}: WaitlistModalProps) {
  const { track } = useAnalyticsContext();
  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");
  const {
    mutate: joinWaitlist,
    isPending,
    isSuccess,
    error,
    reset,
  } = useJoinWaitlist();

  const errorMessage = error?.message || error?.error || "";

  useEffect(() => {
    if (isSuccess) {
      track((inherited) => ({
        name: "waitlist_joined",
        properties: {
          ...inherited,
          trigger,
        },
      }));
    }
  }, [isSuccess, track, trigger]);

  useEffect(() => {
    if (errorMessage) {
      track((inherited) => ({
        name: "waitlist_error",
        properties: {
          ...inherited,
          error: errorMessage,
        },
      }));
    }
  }, [errorMessage, track]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    setLocalError("");
    joinWaitlist(email);
  };

  const handleClose = () => {
    setEmail("");
    setLocalError("");
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), "Waitlist Modal"],
      })}
    >
      <div
        className="fixed inset-0 bg-slate-950/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={handleClose}
      >
        <div
          className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 z-10 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            disabled={isPending}
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </button>

          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                You&apos;re on the list!
              </h2>
              <p className="text-slate-500 mb-6">
                We&apos;ll email you when Pro is ready. Get excited for
                unlimited sessions, detailed analytics, and more.
              </p>
              <Button className="w-full" onClick={handleClose}>
                Got it!
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white text-center">
                <div className="w-16 h-16 bg-linear-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <h2 className="text-2xl font-bold">Pro Launch</h2>
                  <Badge className="text-[10px] px-2 py-0.5" variant="comingSoon">
                    COMING SOON
                  </Badge>
                </div>
                <p className="text-slate-400">
                  Be the first to know when we launch
                </p>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-6">
                  {[
                    {
                      title: "Unlimited Practice",
                      description:
                        "Break free from daily limits and speak as much as you need",
                    },
                    {
                      title: "Tailored Feedback",
                      description:
                        "Get custom recommendations to reduce your most common filler words",
                    },
                    {
                      title: "Targeted Challenges",
                      description:
                        "Access specialized prompts for interviews, pitches, and others",
                    },
                    {
                      title: "Performance Trends",
                      description:
                        "Deep-dive into your clarity score history to visualize your growth",
                    },
                  ].map((feature, i) => (
                    <div className="flex items-center gap-3" key={i}>
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-slate-600 text-sm">
                        <strong className="font-semibold text-slate-900">
                          {feature.title}:
                        </strong>{" "}
                        {feature.description}
                      </span>
                    </div>
                  ))}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        className={cn(
                          "w-full pl-12 pr-4 py-3.5 rounded-xl border-2 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 transition-colors",
                          localError || errorMessage
                            ? "border-red-300 bg-red-50"
                            : "border-slate-200"
                        )}
                        disabled={isPending}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setLocalError("");
                        }}
                        placeholder="Enter your email"
                        type="email"
                        value={email}
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
                    className="w-full"
                    disabled={isPending || !email.trim()}
                    size="lg"
                    type="submit"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Bell className="w-5 h-5" />
                        Notify Me
                      </>
                    )}
                  </Button>
                </form>

                <p className="w-full text-center pt-3 pb-1 mt-3 text-sm text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
                  Join 200+ users on the waitlist.
                </p>
                <p className="w-full text-center text-xs text-slate-500 hover:text-slate-700 cursor-pointer transition-colors">
                  Get 50% off when Pro launches!
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </AnalyticsContextProvider>
  );
}
