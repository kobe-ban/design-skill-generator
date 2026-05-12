"use client";

import { contrastGrade, contrastRatio } from "@/lib/color-utils";
import { cn } from "@/lib/utils";

interface ContrastBadgeProps {
  fg: string;
  bg: string;
  label?: string;
}

export function ContrastBadge({ fg, bg, label }: ContrastBadgeProps) {
  const ratio = contrastRatio(fg, bg);
  const grade = contrastGrade(ratio);
  const passing = grade !== "Fail";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium",
        passing
          ? "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-300"
          : "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-300",
      )}
    >
      <span className="font-mono">{ratio.toFixed(2)}</span>
      <span>{grade}</span>
      {label && <span className="text-neutral-500">· {label}</span>}
    </div>
  );
}
