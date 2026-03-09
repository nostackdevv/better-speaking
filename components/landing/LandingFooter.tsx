import Image from 'next/image';
import Link from 'next/link';

import { ROUTES } from '@/lib/routes';

export const LandingFooter = () => {
  return (
    <footer className="border-grey-300/30 border-t py-12">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <span className="text-grey-900 flex items-center gap-2 text-lg font-extrabold">
              <Image
                alt="Speecha"
                className="rounded-lg"
                height={28}
                src="/logo.svg"
                width={28}
              />
              Speecha
            </span>
            <span className="text-grey-400 text-sm font-medium">
              &copy; {new Date().getFullYear()} Speecha. All rights reserved.
            </span>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              className="text-grey-500 hover:text-grey-900 text-sm font-semibold transition-colors"
              href={ROUTES.blog}
            >
              Blog
            </Link>
            <Link
              className="text-grey-500 hover:text-grey-900 text-sm font-semibold transition-colors"
              href={ROUTES.legal.privacy}
            >
              Privacy Policy
            </Link>
            <Link
              className="text-grey-500 hover:text-grey-900 text-sm font-semibold transition-colors"
              href={ROUTES.legal.terms}
            >
              Terms of Service
            </Link>
            <Link
              className="text-grey-500 hover:text-grey-900 text-sm font-semibold transition-colors"
              href="/"
            >
              Feedback
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
