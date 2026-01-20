"use client";

import { usePathname, useSearchParams } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider, usePostHog } from "posthog-js/react";
import { useEffect, Suspense } from "react";

function initPostHog() {
  if (typeof window === "undefined") return;

  // Disable PostHog in development
  if (process.env.NODE_ENV === "development") {
    console.log("[PostHog] Disabled in development");
    return;
  }

  const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const posthogHost =
    process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  if (!posthogKey) {
    return;
  }

  if (!posthog.__loaded) {
    posthog.init(posthogKey, {
      api_host: posthogHost,
      person_profiles: "identified_only",
      capture_pageleave: true,
      persistence: "localStorage+cookie",
      bootstrap: {
        distinctID: undefined,
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

    posthogClient.capture("$pageview", {
      $current_url: url,
    });
  }, [pathname, searchParams, posthogClient]);

  return null;
}

type PostHogProviderProps = {
  children: React.ReactNode;
};

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
