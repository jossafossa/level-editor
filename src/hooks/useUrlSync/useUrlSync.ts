import { useState, useEffect, useCallback, useRef } from "react";

interface UrlSyncOptions<T> {
  key: string;
  encode: (value: T) => string;
  decode: (str: string) => T;
}

export function useUrlSync<T>(initialValue: T, options: UrlSyncOptions<T>) {
  const { key } = options;
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const getValueFromUrl = useCallback((): T => {
    if (typeof window === "undefined") return initialValue;

    const params = new URLSearchParams(window.location.search);
    const raw = params.get(key);

    if (raw === null) return initialValue;

    try {
      return optionsRef.current.decode(raw);
    } catch (err) {
      console.error(`UrlSync Error (${key}):`, err);
      return initialValue;
    }
  }, [key, initialValue]);

  const [state, setState] = useState<T>(getValueFromUrl);

  useEffect(() => {
    const url = new URL(window.location.href);
    const encoded = optionsRef.current.encode(state);

    if (url.searchParams.get(key) === encoded) return;

    url.searchParams.set(key, encoded);
    window.history.replaceState(null, "", url.toString());
    window.dispatchEvent(new Event("popstate"));
  }, [state, key]);

  useEffect(() => {
    const syncFromUrl = () => {
      const latest = getValueFromUrl();
      if (JSON.stringify(state) === JSON.stringify(latest)) return;
      setState(latest);
    };

    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [state, getValueFromUrl]);

  return [state, setState] as const;
}
