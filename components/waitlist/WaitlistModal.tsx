'use client';

import {
  Crown,
  Check,
  Mail,
  Loader2,
  Bell,
  AlertCircle,
  X,
} from 'lucide-react';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useJoinWaitlist } from '@/hooks/waitlist/useJoinWaitlist';
import { AnalyticsContextProvider, useAnalyticsContext } from '@/lib/analytics';
import { cn } from '@/lib/utils';

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  trigger?: 'pro_badge' | 'challenge_mode' | 'feature_gate';
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function WaitlistModal({
  isOpen,
  onClose,
  trigger = 'pro_badge',
}: WaitlistModalProps) {
  const { track } = useAnalyticsContext();
  const [email, setEmail] = useState('');
  const [localError, setLocalError] = useState('');
  const {
    mutate: joinWaitlist,
    isPending,
    isSuccess,
    error,
    reset,
  } = useJoinWaitlist();

  const errorMessage = error?.message || error?.error || '';

  useEffect(() => {
    if (isSuccess) {
      track((inherited) => ({
        name: 'waitlist_joined',
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
        name: 'waitlist_error',
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
      setLocalError('Please enter a valid email address');
      return;
    }

    setLocalError('');
    joinWaitlist(email);
  };

  const handleClose = () => {
    setEmail('');
    setLocalError('');
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnalyticsContextProvider
      getProperties={(inherited) => ({
        ...inherited,
        source: [...(inherited.source ?? []), 'Waitlist Modal'],
      })}
    >
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
        onClick={handleClose}
      >
        <div
          className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-4 right-4 z-10 cursor-pointer rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            disabled={isPending}
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </button>

          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-slate-900">
                You&apos;re on the list!
              </h2>
              <p className="mb-6 text-slate-500">
                We&apos;ll email you when Pro is ready. Get excited for
                unlimited sessions, detailed analytics, and more.
              </p>
              <Button className="w-full" onClick={handleClose}>
                Got it!
              </Button>
            </div>
          ) : (
            <>
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-amber-400 to-orange-400 shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold">Pro Launch</h2>
                  <Badge
                    className="px-2 py-0.5 text-[10px]"
                    variant="comingSoon"
                  >
                    COMING SOON
                  </Badge>
                </div>
                <p className="text-slate-400">
                  Be the first to know when we launch
                </p>
              </div>

              <div className="p-6">
                <div className="mb-6 space-y-3">
                  {[
                    {
                      title: 'Unlimited Practice',
                      description:
                        'Break free from daily limits and speak as much as you need',
                    },
                    {
                      title: 'Tailored Feedback',
                      description:
                        'Get custom recommendations to reduce your most common filler words',
                    },
                    {
                      title: 'Targeted Challenges',
                      description:
                        'Access specialized prompts for interviews, pitches, and others',
                    },
                    {
                      title: 'Performance Trends',
                      description:
                        'Deep-dive into your clarity score history to visualize your growth',
                    },
                  ].map((feature, i) => (
                    <div className="flex items-center gap-3" key={i}>
                      <div className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                        <Check className="h-3 w-3 text-green-600" />
                      </div>
                      <span className="text-sm text-slate-600">
                        <strong className="font-semibold text-slate-900">
                          {feature.title}:
                        </strong>{' '}
                        {feature.description}
                      </span>
                    </div>
                  ))}
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div>
                    <div className="relative">
                      <Mail className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-slate-400" />
                      <input
                        className={cn(
                          'w-full rounded-xl border-2 py-3.5 pr-4 pl-12 text-slate-900 transition-colors placeholder:text-slate-400 focus:border-orange-500 focus:outline-none',
                          localError || errorMessage
                            ? 'border-red-300 bg-red-50'
                            : 'border-slate-200'
                        )}
                        disabled={isPending}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setLocalError('');
                        }}
                        placeholder="Enter your email"
                        type="email"
                        value={email}
                      />
                    </div>
                    {(localError || errorMessage) && (
                      <p className="mt-2 flex items-center gap-1 text-sm text-red-600">
                        <AlertCircle className="h-4 w-4" />
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
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Joining...
                      </>
                    ) : (
                      <>
                        <Bell className="h-5 w-5" />
                        Notify Me
                      </>
                    )}
                  </Button>
                </form>

                <p className="mt-3 w-full cursor-pointer pt-3 pb-1 text-center text-sm text-slate-500 transition-colors hover:text-slate-700">
                  Join 200+ users on the waitlist.
                </p>
                <p className="w-full cursor-pointer text-center text-xs text-slate-500 transition-colors hover:text-slate-700">
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
