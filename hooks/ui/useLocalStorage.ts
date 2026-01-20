import { useState, useEffect, useCallback } from 'react';

interface UseLocalStorageOptions<T> {
  key: string;
  defaultValue: T;
}

function getStoredValue<T>(
  key: string,
  defaultValue: T
): { value: T; loaded: boolean } {
  if (typeof window === 'undefined') {
    return { value: defaultValue, loaded: false };
  }
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      return { value: JSON.parse(stored) as T, loaded: true };
    }
  } catch {
    // Ignore parsing errors
  }
  return { value: defaultValue, loaded: true };
}

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageOptions<T>) {
  const [state, setState] = useState(() => getStoredValue(key, defaultValue));

  useEffect(() => {
    if (state.loaded) {
      localStorage.setItem(key, JSON.stringify(state.value));
    }
  }, [key, state.value, state.loaded]);

  const setValue = useCallback((newValue: T | ((prev: T) => T)) => {
    setState((prev) => ({
      ...prev,
      value:
        typeof newValue === 'function'
          ? (newValue as (prev: T) => T)(prev.value)
          : newValue,
    }));
  }, []);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setState({ value: defaultValue, loaded: true });
  }, [key, defaultValue]);

  return { value: state.value, setValue, isLoaded: state.loaded, remove };
}
