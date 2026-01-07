"use client";

import { useState } from "react";
import {
  Mic,
  History,
  Crown,
  User,
  Settings,
  CreditCard,
  LogOut,
  Flame,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

type NavbarProps = {
  onHistoryClick?: () => void;
  onWaitlistClick?: () => void;
};

export function Navbar({ onHistoryClick, onWaitlistClick }: NavbarProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 z-40">
      <div className="max-w-6xl mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            aria-label="Speechdeck home"
            className="flex items-center gap-3"
            href={ROUTES.home}
          >
            <div className="w-10 h-10 rounded-xl bg-orange-600 flex items-center justify-center shadow-lg ">
              <Mic className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-slate-900">Speechdeck</span>
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Streak */}
          {/* <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 rounded-full mr-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-700">{user.streak}</span>
          </div> */}

          {/* History */}
          <button
            className="p-2.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            onClick={onHistoryClick}
          >
            <History className="w-5 h-5" />
          </button>

          <button
            className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            onClick={onWaitlistClick}
          >
            <Crown className="w-4 h-4 text-amber-500" />
            <span className="text-sm font-semibold text-slate-700">Pro</span>
            <Badge className="text-[10px] px-1.5 py-0.5" variant="comingSoon">
              SOON
            </Badge>
          </button>

          {/* User menu */}
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
