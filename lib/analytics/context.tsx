'use client';

import { createContext, useContext, useCallback, useMemo } from 'react';

import { analytics } from './analytics';
import type {
  EventProperties,
  GetEventCallback,
  GetPropertiesCallback,
} from './types';

type AnalyticsContextValue = {
  getProperties: () => EventProperties;
  track: (callback: GetEventCallback) => void;
};

const AnalyticsContext = createContext<AnalyticsContextValue>({
  getProperties: () => ({}),
  track: () => {},
});

type AnalyticsContextProviderProps = {
  children: React.ReactNode;
  getProperties: GetPropertiesCallback;
};

export function AnalyticsContextProvider({
  children,
  getProperties,
}: AnalyticsContextProviderProps) {
  const parent = useContext(AnalyticsContext);

  const mergedGetProperties = useCallback((): EventProperties => {
    const inherited = parent.getProperties();
    return getProperties(inherited);
  }, [parent, getProperties]);

  const track = useCallback(
    (callback: GetEventCallback) => {
      const inherited = mergedGetProperties();
      const event = callback(inherited);
      analytics.track(event.name, event.properties);
    },
    [mergedGetProperties]
  );

  const value = useMemo(
    () => ({ getProperties: mergedGetProperties, track }),
    [mergedGetProperties, track]
  );

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalyticsContext() {
  return useContext(AnalyticsContext);
}
