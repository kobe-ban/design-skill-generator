"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { TOTAL_STEPS } from "@/lib/store";
import { cn } from "@/lib/utils";

interface QuizNavProps {
  step: number;
  canProceed?: boolean;
  finalLabel?: string;
}

export function QuizNav({ step, canProceed = true, finalLabel = "ดูผลสรุป" }: QuizNavProps) {
  const router = useRouter();

  const back = () => {
    if (step <= 1) router.push("/");
    else router.push(`/quiz/${step - 1}`);
  };

  const next = () => {
    if (!canProceed) return;
    if (step >= TOTAL_STEPS) router.push("/result");
    else router.push(`/quiz/${step + 1}`);
  };

  const isLast = step >= TOTAL_STEPS;

  return (
    <div className="flex items-center justify-between">
      <button
        type="button"
        onClick={back}
        className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800"
      >
        <ArrowLeft className="h-4 w-4" /> ย้อนกลับ
      </button>
      <button
        type="button"
        onClick={next}
        disabled={!canProceed}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-lg px-4 py-1.5 text-sm font-medium text-white transition-all",
          canProceed
            ? "bg-blue-500 hover:bg-blue-600"
            : "cursor-not-allowed bg-neutral-300 dark:bg-neutral-700",
        )}
      >
        {isLast ? finalLabel : "ถัดไป"} <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  );
}
