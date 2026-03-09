import type { Metadata } from 'next';

import { CtaSection } from '@/components/landing/CtaSection';
import { FaqSection } from '@/components/landing/FaqSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { HeroSection } from '@/components/landing/HeroSection';
import { HowItWorksSection } from '@/components/landing/HowItWorksSection';
import { LandingFooter } from '@/components/landing/LandingFooter';
import { LandingNav } from '@/components/landing/LandingNav';
import { ScrollAnimator } from '@/components/landing/ScrollAnimator';

export const metadata: Metadata = {
  title: 'Speecha — Speak Better, One Day at a Time',
  description:
    'Eliminate filler words like um, uh, and like. Record yourself for 60 seconds, get instant AI feedback, and watch your clarity improve daily.',
};

export default function LandingPage() {
  return (
    <div className="font-nunito text-grey-900 overflow-x-hidden bg-white antialiased">
      <LandingNav />
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
      <LandingFooter />
      <ScrollAnimator />
    </div>
  );
}
