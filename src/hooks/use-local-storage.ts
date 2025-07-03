
"use client";

import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // This effect runs once on the client to read from localStorage
  // and initialize the state.
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
    } finally {
      // Mark as initialized so the write effect can run.
      setIsInitialized(true);
    }
    // Disabling lint because we only want this to run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // This effect writes to localStorage whenever storedValue changes,
  // but only after the state has been initialized from localStorage.
  useEffect(() => {
    if (isInitialized) {
      try {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    }
  }, [key, storedValue, isInitialized]);

  return [storedValue, setStoredValue];
}
