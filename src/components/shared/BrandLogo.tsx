"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
  wordmark?: "short" | "full";
};

export function BrandLogo({
  className,
  markClassName,
  showWordmark = true,
  wordmark = "short",
}: BrandLogoProps) {
  const [logoUrl, setLogoUrl] = useState("");

  useEffect(() => {
    fetch("/api/public/images")
      .then((r) => r.json())
      .then((data) => {
        const url = data?.map?.["brand.logo"];
        if (typeof url === "string" && url.trim()) setLogoUrl(url.trim());
      })
      .catch(() => undefined);
  }, []);

  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      {logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt="Team X Technologies"
          className={cn(
            "h-8 w-8 rounded-lg object-contain",
            markClassName
          )}
        />
      ) : (
        <span
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg bg-accent font-display text-sm font-bold text-accent-foreground",
            markClassName
          )}
        >
          X
        </span>
      )}
      {showWordmark && (
        <span className="font-display text-base font-semibold tracking-tight text-foreground">
          {wordmark === "full" ? (
            <>
              Team<span className="text-accent">X</span> Technologies
            </>
          ) : (
            <>
              Team<span className="text-accent">X</span>
            </>
          )}
        </span>
      )}
    </span>
  );
}
