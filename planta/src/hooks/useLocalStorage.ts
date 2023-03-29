/* eslint-disable no-console */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T | undefined>();
  const [timestamp, setTimestamp] = useState<Date>(new Date());

  const setValue = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  useEffect(() => {
    const value = window.localStorage.getItem(key);

    if (value) {
      try {
        const parsed = JSON.parse(value) as T;
        setStoredValue(parsed);
      } catch (error) {
        console.log(error);
        setStoredValue(initialValue);
      }
    } else {
      setStoredValue(initialValue);
    }
  }, []);

  useEffect(() => {
    if (storedValue) {
      setValue(storedValue);
    }
  }, [storedValue, timestamp]);

  const setValueAndTimestamp = (value:T) => {
    setStoredValue(value);
    setTimestamp(new Date());
  }

  return [storedValue as T, setValueAndTimestamp] as const;
};