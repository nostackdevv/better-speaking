function isMobileDevice(): boolean {
  // Guard for SSR / non-browser environments
  if (typeof window === "undefined") {
    return false;
  }

  const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const hasNoHover = window.matchMedia("(hover: none)").matches;
  const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;

  return (hasCoarsePointer && hasNoHover) || hasTouch;
}

export const useIsMobile = () => {
  if (typeof window === "undefined") {
    return false;
  }
  return isMobileDevice();
};
