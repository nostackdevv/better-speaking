import { useState, useEffect, useCallback } from "react";

interface UseLocalStorageOptions<T> {
  key: string;
  defaultValue: T;
}

export function useLocalStorage<T>({
  key,
  defaultValue,
}: UseLocalStorageOptions<T>) {
  const [value, setValue] = useState<T>(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(key);
      if (stored) setValue(JSON.parse(stored));
    } catch (e) {
      console.error(`Failed to load ${key} from localStorage:`, e);
    }
    setIsLoaded(true);
  }, [key]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value, isLoaded]);

  const remove = useCallback(() => {
    localStorage.removeItem(key);
    setValue(defaultValue);
  }, [key, defaultValue]);

  return { value, setValue, isLoaded, remove };
}
