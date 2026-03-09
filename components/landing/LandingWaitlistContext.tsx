'use client';

import { createContext, useContext, useState } from 'react';

import { WaitlistModal } from '@/components/waitlist/WaitlistModal';

type LandingWaitlistContextValue = {
  openModal: () => void;
};

const LandingWaitlistContext =
  createContext<LandingWaitlistContextValue | null>(null);

export const useLandingWaitlist = () => {
  const ctx = useContext(LandingWaitlistContext);
  if (!ctx)
    throw new Error(
      'useLandingWaitlist must be used within LandingWaitlistProvider'
    );
  return ctx;
};

export const LandingWaitlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <LandingWaitlistContext.Provider
      value={{ openModal: () => setIsOpen(true) }}
    >
      {children}
      <WaitlistModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trigger="feature_gate"
      />
    </LandingWaitlistContext.Provider>
  );
};
