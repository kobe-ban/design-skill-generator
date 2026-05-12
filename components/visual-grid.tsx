"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface GridItem<T extends string> {
  id: T;
  label: string;
  labelTh: string;
  description: string;
  descriptionTh: string;
}

interface VisualGridProps<T extends string> {
  items: GridItem<T>[];
  selected?: T;
  onSelect: (id: T) => void;
  renderPreview: (id: T) => React.ReactNode;
  columns?: 2 | 3 | 4 | 5;
  lang?: "th" | "en";
  compact?: boolean;
}

export function VisualGrid<T extends string>({
  items,
  selected,
  onSelect,
  renderPreview,
  columns = 4,
  lang = "th",
  compact = true,
}: VisualGridProps<T>) {
  const gridCols = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
    5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  }[columns];

  return (
    <div className={cn("grid gap-3", gridCols)}>
      {items.map((item) => {
        const isSelected = selected === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item.id)}
            className={cn(
              "group relative flex flex-col gap-2 rounded-xl border-2 bg-white p-2 text-left transition-all dark:bg-neutral-950",
              "hover:border-blue-400 hover:shadow-md",
              isSelected
                ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20"
                : "border-neutral-200 dark:border-neutral-800",
            )}
          >
            {isSelected && (
              <div className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className={cn("w-full overflow-hidden rounded-md", compact ? "aspect-[4/3]" : "aspect-video")}>
              {renderPreview(item.id)}
            </div>
            <div className="flex flex-col gap-0.5 px-1 pb-1">
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {lang === "th" ? item.labelTh : item.label}
              </div>
              <div className="line-clamp-2 text-[11px] leading-tight text-neutral-600 dark:text-neutral-400">
                {lang === "th" ? item.descriptionTh : item.description}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
