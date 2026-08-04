"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildPhotoIdToKey,
  resolveMediaUrl,
} from "@/lib/cms/media";

type CmsMediaContextValue = {
  resolve: (url: string | undefined | null) => string;
  ready: boolean;
};

const CmsMediaContext = createContext<CmsMediaContextValue>({
  resolve: (url) => url || "",
  ready: false,
});

export function CmsMediaProvider({ children }: { children: ReactNode }) {
  const [map, setMap] = useState<Record<string, string>>({});
  const [ready, setReady] = useState(false);
  const photoIdToKey = useMemo(() => buildPhotoIdToKey(), []);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public/images")
      .then((r) => r.json())
      .then((data) => {
        if (cancelled) return;
        if (data?.map && typeof data.map === "object") {
          setMap(data.map as Record<string, string>);
        }
      })
      .catch(() => undefined)
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const resolve = useCallback(
    (url: string | undefined | null) => resolveMediaUrl(url, map, photoIdToKey),
    [map, photoIdToKey]
  );

  const value = useMemo(() => ({ resolve, ready }), [resolve, ready]);

  return (
    <CmsMediaContext.Provider value={value}>{children}</CmsMediaContext.Provider>
  );
}

export function useCmsMedia() {
  return useContext(CmsMediaContext);
}

/** Resolve a single URL against live CMS image overrides */
export function useResolvedMedia(url: string | undefined | null): string {
  const { resolve } = useCmsMedia();
  return resolve(url);
}
