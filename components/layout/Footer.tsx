'use client';

import { Heart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import { FeedbackModal } from '@/components/feedback/FeedbackModal';
import { ROUTES } from '@/lib/routes';

import { WaitlistModal } from '../waitlist/WaitlistModal';

export function Footer() {
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);

  return (
    <footer className="relative">
      <div className="absolute inset-0 bg-slate-900" />
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-16">
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
          <div className="col-span-2">
            <Link
              aria-label="Speecha home"
              className="inline-flex items-center gap-3"
              href={ROUTES.app}
            >
              <Image
                alt="Speecha"
                className="rounded-2xl"
                height={48}
                src="/logo.svg"
                width={48}
              />
              <span className="text-2xl font-bold text-white">Speecha</span>
            </Link>
            <p className="mb-6 leading-relaxed text-slate-400">
              Track how much filler words you use, eliminate it, and speak with
              confidence in every conversation.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <button
                  className="cursor-pointer text-slate-400 transition-colors hover:text-orange-400"
                  onClick={() => setIsFeedbackModalOpen(true)}
                >
                  Send Feedback
                </button>
              </li>

              <li>
                <button
                  className="cursor-pointer text-slate-400 transition-colors hover:text-orange-400"
                  onClick={() => setIsWaitlistModalOpen(true)}
                >
                  Join the pro waitlist
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-semibold text-white">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  className="text-slate-400 transition-colors hover:text-orange-400"
                  href={ROUTES.legal.privacy}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  className="text-slate-400 transition-colors hover:text-orange-400"
                  href={ROUTES.legal.terms}
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 sm:flex-row">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Speecha. All rights reserved.
          </p>
          <p className="flex items-center gap-2 text-sm text-slate-500">
            Made with <Heart className="h-4 w-4 fill-rose-500 text-rose-500" />{' '}
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
