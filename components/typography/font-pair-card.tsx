"use client";

import { Check } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { FontPair } from "@/lib/google-fonts";
import { googleFontsUrl } from "@/lib/google-fonts";

interface FontPairCardProps {
  pair: FontPair;
  selected?: boolean;
  onClick: () => void;
}

const loadedFonts = new Set<string>();

function injectFontLink(href: string) {
  if (typeof document === "undefined") return;
  if (loadedFonts.has(href)) return;
  loadedFonts.add(href);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

export function FontPairCard({ pair, selected, onClick }: FontPairCardProps) {
  const url = googleFontsUrl([
    { family: pair.display.family, weights: pair.display.weights },
    { family: pair.body.family, weights: pair.body.weights },
  ]);

  useEffect(() => {
    injectFontLink(url);
  }, [url]);

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-1 rounded-xl border-2 bg-white p-3 text-left transition-all dark:bg-neutral-950",
        "hover:border-blue-400 hover:shadow-md",
        selected
          ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20"
          : "border-neutral-200 dark:border-neutral-800",
      )}
    >
      {selected && (
        <div className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
          <Check className="h-3 w-3" />
        </div>
      )}
      <div
        className="text-xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100"
        style={{ fontFamily: `"${pair.display.family}", system-ui` }}
      >
        Display
      </div>
      <div
        className="text-xs text-neutral-700 dark:text-neutral-300"
        style={{ fontFamily: `"${pair.body.family}", system-ui` }}
      >
        Body text · ตัวไทย
      </div>
      <div className="mt-1 flex items-center justify-between">
        <div className="truncate text-[10px] text-neutral-500">{pair.name}</div>
        <div className="text-[10px] font-medium text-blue-500">{pair.vibe}</div>
      </div>
    </button>
  );
}
