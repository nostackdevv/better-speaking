import Link from 'next/link';

import { ROUTES } from '@/lib/routes';

const AppleIcon = () => (
  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

export const CtaSection = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="fade-up mx-auto max-w-5xl px-6 text-center">
        <h2 className="mb-6 text-3xl font-extrabold tracking-tight md:text-5xl">
          Ready to speak
          <br />
          with confidence?
        </h2>
        <p className="text-grey-500 mx-auto mb-10 max-w-md text-lg font-medium">
          Join thousands improving their speech clarity one minute at a time.
        </p>
        <Link
          className="bg-clarity shadow-clarity/20 hover:bg-clarity-600 inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
          href={ROUTES.app}
        >
          <AppleIcon />
          Download on the App Store
        </Link>
      </div>
    </section>
  );
};
