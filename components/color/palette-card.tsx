"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Palette } from "@/types";

interface PaletteCardProps {
  palette: Palette;
  selected?: boolean;
  onClick: () => void;
}

export function PaletteCard({ palette, selected, onClick }: PaletteCardProps) {
  const swatches: { color: string; label: string }[] = [
    { color: palette.primary, label: "Primary" },
    { color: palette.secondary, label: "Secondary" },
    { color: palette.accent, label: "Accent" },
    { color: palette.background, label: "BG" },
    { color: palette.foreground, label: "FG" },
  ];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col gap-2 rounded-xl border-2 bg-white p-2 text-left transition-all dark:bg-neutral-950",
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
      <div className="flex h-10 w-full overflow-hidden rounded-md">
        {swatches.map((s) => (
          <div
            key={s.label}
            className="flex-1"
            style={{ backgroundColor: s.color }}
            title={`${s.label}: ${s.color}`}
          />
        ))}
      </div>
      <div className="px-1 pb-1">
        <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{palette.name}</div>
        <div className="text-[10px] text-neutral-500">
          {palette.mode === "dark" ? "Dark" : "Light"} · {palette.primary}
        </div>
      </div>
    </button>
  );
}
