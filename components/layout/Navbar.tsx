'use client';

import { History, Crown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/Badge';
import { ROUTES } from '@/lib/routes';

type NavbarProps = {
  onHistoryClick?: () => void;
  onWaitlistClick?: () => void;
};

export function Navbar({ onHistoryClick, onWaitlistClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 right-0 left-0 z-40 h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link
            aria-label="Speecha home"
            className="flex items-center gap-3"
            href={ROUTES.app}
          >
            <Image
              alt="Speecha"
              className="rounded-xl shadow-lg"
              height={40}
              src="/logo.svg"
              width={40}
            />
            <span className="text-xl font-bold text-slate-900">Speecha</span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          {/* <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full mr-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700">{user.streak}</span>
          </div> */}

          {onHistoryClick && (
            <button
              className="cursor-pointer rounded-xl p-2.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
              onClick={onHistoryClick}
              type="button"
            >
              <History className="h-5 w-5" />
            </button>
          )}

          {onWaitlistClick && (
            <button
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-slate-100 px-3 py-2 transition-colors hover:bg-slate-200"
              onClick={onWaitlistClick}
              type="button"
            >
              <Crown className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-slate-700">Pro</span>
              <Badge className="px-1.5 py-0.5 text-[10px]" variant="comingSoon">
                SOON
              </Badge>
            </button>
          )}

          {/* <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="w-10 h-10 rounded-full bg-linear-to-br from-orange-400 to-rose-500 flex items-center justify-center text-white font-semibold cursor-pointer hover:shadow-lg transition-shadow"
            >
              {user.name[0]}
            </button>

            {showUserMenu && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                <div className="absolute right-0 top-12 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="text-sm text-slate-500">{user.plan === "pro" ? "Pro Plan" : "Free Plan"}</p>
                  </div>
                  <div className="py-1">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
                      <User className="w-4 h-4" /> Profile
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <button className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 cursor-pointer">
                      <CreditCard className="w-4 h-4" /> Billing
                    </button>
                    {user.plan === "free" && (
                      <button
                        onClick={() => {
                          setShowUserMenu(false);
                          onWaitlistClick?.();
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50 flex items-center gap-3 cursor-pointer"
                      >
                        <Crown className="w-4 h-4 text-amber-500" />
                        Join Pro Waitlist
                        <Badge variant="comingSoon" className="text-[10px] px-1.5 py-0.5 ml-auto">
                          SOON
                        </Badge>
                      </button>
                    )}
                  </div>
                  <div className="border-t border-slate-100 py-1">
                    <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-3 cursor-pointer">
                      <LogOut className="w-4 h-4" /> Sign out
                    </button>
                  </div>
                </div>
              </>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
}
