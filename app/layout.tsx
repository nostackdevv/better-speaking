import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { FloatingFeedbackButton } from "@/components/feedback/FloatingFeedbackButton";
import { APP_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "Speecha - Improve Your Public Speaking | Reduce Filler Words",
    template: "%s | Speecha",
  },
  description:
    "Speecha helps you become a confident speaker by tracking and reducing filler words like 'um', 'uh', and 'like'. Record yourself, get instant analysis, and improve your speaking skills.",
  keywords: [
    "Speecha",
    "public speaking",
    "filler words",
    "speech improvement",
    "speaking skills",
    "presentation skills",
    "reduce um",
    "speaking confidence",
    "speech analysis",
    "filler word tracker",
  ],
  authors: [{ name: "Speecha" }],
  creator: "Speecha",
  publisher: "Speecha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: APP_URL,
    siteName: "Speecha",
    title: "Speecha - Improve Your Public Speaking | Reduce Filler Words",
    description:
      "Speecha helps you become a confident speaker by tracking and reducing filler words. Record yourself, get instant analysis, and improve your speaking skills.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Speecha - Improve Your Public Speaking",
      },
    ],
  },
  // twitter: {
  //   card: "summary_large_image",
  //   title: "Speecha - Improve Your Public Speaking",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>{children}</Providers>
        <FloatingFeedbackButton />
      </body>
    </html>
  );
}
