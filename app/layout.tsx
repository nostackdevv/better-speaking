import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';
import { FloatingFeedbackButton } from '@/components/feedback/FloatingFeedbackButton';
import { APP_URL } from '@/lib/constants';

import { Providers } from './providers';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Speecha',
  applicationCategory: 'EducationalApplication',
  operatingSystem: 'Web',
  url: APP_URL,
  description:
    "Track and reduce filler words like 'um', 'uh', and 'like'. Become a confident speaker.",
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Organization',
    name: 'Speecha',
    url: APP_URL,
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Speecha - Improve Your Speaking Skills | Reduce Filler Words',
    template: '%s | Speecha',
  },
  description:
    "Speecha helps you become a confident speaker by tracking and reducing filler words like 'um', 'uh', and 'like'. Record yourself, get instant analysis, and improve your speaking skills.",
  keywords: [
    'Speecha',
    'public speaking',
    'filler words',
    'speech improvement',
    'speaking skills',
    'presentation skills',
    'reduce um',
    'speaking confidence',
    'speech analysis',
    'filler word tracker',
  ],
  authors: [{ name: 'Speecha' }],
  creator: 'Speecha',
  publisher: 'Speecha',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon-96x96.png', type: 'image/png', sizes: '96x96' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Speecha',
    title: 'Speecha - Improve Your Speaking Skills | Reduce Filler Words',
    description:
      'Speecha helps you become a confident speaker by tracking and reducing filler words. Record yourself, get instant analysis, and improve your speaking skills.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Speecha - Improve Your Speaking Skills',
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Speecha - Improve Your Speaking Skills",
  //   description:
  //     "Track and reduce filler words like 'um', 'uh', and 'like'. Become a confident speaker with Speecha.",
  //   images: ["/og-image.png"],
  //   creator: "@speikiapp",
  // },
  alternates: {
    canonical: APP_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          type="application/ld+json"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <FloatingFeedbackButton />
      </body>
    </html>
  );
}
