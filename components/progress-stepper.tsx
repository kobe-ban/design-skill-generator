"use client";

import { cn } from "@/lib/utils";
import { TOTAL_STEPS, stepTitles } from "@/lib/store";

interface ProgressStepperProps {
  current: number;
}

export function ProgressStepper({ current }: ProgressStepperProps) {
  const percent = (current / TOTAL_STEPS) * 100;
  const title = stepTitles[current];

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-neutral-700 dark:text-neutral-300">
          ขั้น {current}/{TOTAL_STEPS} · {title?.th}
        </span>
        <span className="text-neutral-500">{Math.round(percent)}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-800">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300",
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
