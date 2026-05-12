"use client";

import type { TypographyVibeId } from "@/types";

interface VibePreviewProps {
  id: TypographyVibeId;
}

const vibeStyles: Record<TypographyVibeId, { aa: string; sample: string; subFont: string; mainFont: string }> = {
  "serif-elegant": {
    mainFont: "Georgia, 'Times New Roman', serif",
    subFont: "Georgia, serif",
    aa: "Aa",
    sample: "Editorial Heading",
  },
  "sans-modern": {
    mainFont: "system-ui, -apple-system, sans-serif",
    subFont: "system-ui, sans-serif",
    aa: "Aa",
    sample: "Modern Headline",
  },
  "display-playful": {
    mainFont: "Georgia, serif",
    subFont: "system-ui, sans-serif",
    aa: "Aa!",
    sample: "Hello Display",
  },
  "mono-technical": {
    mainFont: "ui-monospace, 'SF Mono', Menlo, monospace",
    subFont: "ui-monospace, monospace",
    aa: "{ }",
    sample: "console.log()",
  },
  "hand-script": {
    mainFont: "'Brush Script MT', cursive",
    subFont: "'Brush Script MT', cursive",
    aa: "Aa",
    sample: "Handwritten",
  },
  mixed: {
    mainFont: "Georgia, serif",
    subFont: "system-ui, sans-serif",
    aa: "Aa",
    sample: "Mixed Type",
  },
};

export function VibePreview({ id }: VibePreviewProps) {
  const v = vibeStyles[id];
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1 rounded-lg bg-gradient-to-br from-neutral-50 to-neutral-100 p-3 dark:from-neutral-900 dark:to-neutral-950">
      <div
        className="text-5xl font-semibold leading-none text-neutral-900 dark:text-neutral-100"
        style={{ fontFamily: v.mainFont }}
      >
        {v.aa}
      </div>
      <div
        className="text-xs text-neutral-600 dark:text-neutral-400"
        style={{ fontFamily: v.subFont }}
      >
        {v.sample}
      </div>
    </div>
  );
}
