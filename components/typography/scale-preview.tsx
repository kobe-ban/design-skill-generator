"use client";

import { buildScale } from "@/lib/google-fonts";
import type { FontChoice, ScaleRatio } from "@/types";

interface ScalePreviewProps {
  display: FontChoice;
  body: FontChoice;
  scale: ScaleRatio;
}

export function ScalePreview({ display, body, scale }: ScalePreviewProps) {
  const sizes = buildScale(16, scale);
  const samples = [
    { tag: "h1", size: sizes["6xl"], font: display, text: "Hero Headline" },
    { tag: "h2", size: sizes["4xl"], font: display, text: "Section Title" },
    { tag: "h3", size: sizes["2xl"], font: display, text: "Subheading" },
    { tag: "p", size: sizes.base, font: body, text: "Body paragraph at the base size." },
    { tag: "small", size: sizes.sm, font: body, text: "Small caption text." },
  ];

  return (
    <div className="space-y-3 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
      {samples.map((s) => (
        <div key={s.tag} className="flex items-baseline gap-3 border-b border-neutral-100 pb-2 dark:border-neutral-800">
          <span className="w-12 font-mono text-xs text-neutral-400">{s.tag}</span>
          <span className="w-12 font-mono text-xs text-neutral-400">{s.size}px</span>
          <span
            style={{
              fontFamily: `"${s.font.family}", system-ui`,
              fontSize: `${s.size}px`,
              lineHeight: 1.2,
            }}
            className="text-neutral-900 dark:text-neutral-100"
          >
            {s.text}
          </span>
        </div>
      ))}
    </div>
  );
}
