"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

/**
 * Initialize PostHog client-side only
 * Handles cases where PostHog key is not configured
 */
function initPostHog() {
  if (typeof window === "undefined") return;

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!posthogKey) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[PostHog] NEXT_PUBLIC_POSTHOG_KEY is not set. Analytics disabled.");
    }
    return;
  }

  if (!posthog.__loaded) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      capture_pageview: false, // We handle this manually for Next.js navigation
      capture_pageleave: true,
      persistence: "localStorage+cookie",
      bootstrap: {
        distinctID: undefined, // Let PostHog generate anonymous ID
      },
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          // Enable debug mode in development
          posthog.debug();
        }
      },
    });
  }
}

/**
 * Tracks pageviews on route changes
 * Wrapped in Suspense because useSearchParams() needs it
 */
function PostHogPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const posthogClient = usePostHog();

  useEffect(() => {
    if (!pathname || !posthogClient) return;

    // Build the full URL
    let url = window.origin + pathname;
    const search = searchParams?.toString();
    if (search) {
      url = url + "?" + search;
    }

    // Capture pageview with URL
    posthogClient.capture("$pageview", {
      $current_url: url,
    });
  }, [pathname, searchParams, posthogClient]);

  return null;
}

type PostHogProviderProps = {
  children: React.ReactNode;
};

/**
 * PostHog Provider for Next.js App Router
 *
 * Features:
 * - Client-side initialization only
 * - Automatic pageview tracking that works with Next.js navigation
 * - Graceful handling when PostHog is not configured
 * - Debug mode in development
 */
export function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    initPostHog();
  }, []);

  // If PostHog key is not set, just render children without the provider
  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!posthogKey) {
    return <>{children}</>;
  }

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  );
}
