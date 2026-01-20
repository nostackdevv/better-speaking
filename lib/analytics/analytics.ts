import posthog from "posthog-js";

import type { EventProperties } from "./types";

function isAvailable(): boolean {
  if (typeof window === "undefined") return false;
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return false;
  if (!posthog.__loaded) return false;
  return true;
}

function track(name: string, properties: EventProperties): void {
  if (!isAvailable()) return;

  try {
    posthog.capture(name, properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Analytics] Failed to capture "${name}":`, error);
    }
  }
}

function identify(userId: string, traits?: Record<string, unknown>): void {
  if (!isAvailable()) return;

  try {
    posthog.identify(userId, traits);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Failed to identify user:", error);
    }
  }
}

function reset(): void {
  if (!isAvailable()) return;

  try {
    posthog.reset();
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Failed to reset:", error);
    }
  }
}

function setUserProperties(properties: Record<string, unknown>): void {
  if (!isAvailable()) return;

  try {
    posthog.setPersonProperties(properties);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[Analytics] Failed to set user properties:", error);
    }
  }
}

export const analytics = {
  track,
  identify,
  reset,
  setUserProperties,
};

export default analytics;
