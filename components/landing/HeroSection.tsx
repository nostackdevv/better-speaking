import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/lib/routes';

const AppleIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden pt-32 pb-20 md:pt-44 md:pb-32">
      <div className="blob bg-clarity top-0 -right-40 h-[500px] w-[500px]" />
      <div className="blob bg-momentum top-60 -left-40 h-[400px] w-[400px]" />
      <div className="blob bg-clarity bottom-20 left-1/3 h-[300px] w-[300px]" />

      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-grey-900 mb-6 text-4xl leading-[1.1] font-extrabold tracking-tight md:text-6xl">
            Speak better by
            <br />
            <span className="text-clarity">cutting the fillers</span>
          </h1>
          <p className="text-grey-500 mx-auto mb-10 max-w-lg text-lg leading-relaxed font-medium md:text-xl">
            Record yourself for 60 seconds. See every <em>um</em>, <em>uh</em>,
            and <em>like</em> highlighted. Build the daily habit that transforms
            how you speak.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              className="bg-grey-900 hover:bg-grey-800 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
              href={ROUTES.app}
            >
              <AppleIcon />
              Download on the App Store
            </Link>
            <a
              className="text-grey-500 hover:text-grey-900 font-bold transition-colors"
              href="#how-it-works"
            >
              How it works &darr;
            </a>
          </div>
        </div>

        <div className="relative mt-16 flex justify-center md:mt-24">
          <div className="phone-frame phone-hero-left fade-up mt-12 -mr-4 hidden w-[200px] md:block md:w-[240px]">
            <Image
              alt="Filler word selection screen"
              height={480}
              src="/landing/FILLERS.png"
              width={240}
            />
          </div>
          <div className="phone-frame phone-hero-center fade-up z-10 mx-auto w-[260px] md:w-[300px]">
            <Image
              alt="Speecha home screen showing streak tracking and session options"
              height={600}
              src="/landing/HOME.png"
              width={300}
            />
          </div>
          <div className="phone-frame phone-hero-right fade-up mt-12 -ml-4 hidden w-[200px] md:block md:w-[240px]">
            <Image
              alt="Session results with clarity score"
              height={480}
              src="/landing/RESULT.png"
              width={240}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
