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
          className="animate-scaleIn relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="text-grey-400 absolute top-4 right-4 z-10 cursor-pointer rounded-lg p-2 transition-colors hover:bg-white/10 hover:text-white"
            disabled={isPending}
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </button>

          {isSuccess ? (
            <div className="p-8 text-center">
              <div className="bg-clarity-100 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl">
                <Check className="text-clarity h-8 w-8" />
              </div>
              <h2 className="text-grey-900 mb-2 text-2xl font-bold">
                You&apos;re on the list!
              </h2>
              <p className="text-grey-500 mb-6">
                We&apos;ll email you when Pro is ready. Get excited for
                unlimited sessions, detailed analytics, and more.
              </p>
              <button
                className="bg-grey-900 hover:bg-grey-800 w-full cursor-pointer rounded-full px-5 py-3 font-bold text-white transition-colors"
                onClick={handleClose}
              >
                Got it!
              </button>
            </div>
          ) : (
            <>
              <div className="from-grey-900 to-grey-800 bg-gradient-to-br p-8 text-center text-white">
                <div className="bg-clarity mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg">
                  <Crown className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2 flex items-center justify-center gap-2">
                  <h2 className="text-2xl font-bold">
                    We&apos;re launching soon
                  </h2>
                </div>
                <p className="text-grey-400">
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
                      <div className="bg-clarity-100 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full">
                        <Check className="text-clarity-700 h-3 w-3" />
                      </div>
                      <span className="text-grey-600 text-sm">
                        <strong className="text-grey-900 font-semibold">
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
                      <Mail className="text-grey-400 absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2" />
                      <input
                        className={cn(
                          'text-grey-900 placeholder:text-grey-400 focus:border-clarity w-full rounded-xl border-2 py-3.5 pr-4 pl-12 transition-colors focus:outline-none',
                          localError || errorMessage
                            ? 'border-red-300 bg-red-50'
                            : 'border-grey-200'
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

                  <button
                    className="bg-grey-900 hover:bg-grey-800 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 text-lg font-bold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isPending || !email.trim()}
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
                  </button>
                </form>

                <p className="text-grey-500 hover:text-grey-700 mt-3 w-full cursor-pointer pt-3 pb-1 text-center text-sm transition-colors">
                  Join 200+ users on the waitlist.
                </p>
                <p className="text-grey-500 hover:text-grey-700 w-full cursor-pointer text-center text-xs transition-colors">
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
