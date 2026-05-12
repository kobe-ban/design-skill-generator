"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MoodQuestion } from "@/lib/questions";

interface QuestionCardProps {
  question: MoodQuestion;
  value?: string;
  onChange: (value: string) => void;
  lang?: "th" | "en";
}

export function QuestionCard({ question, value, onChange, lang = "th" }: QuestionCardProps) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
        {lang === "th" ? question.questionTh : question.question}
      </h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {question.options.map((opt) => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "relative flex flex-col items-center gap-1 rounded-xl border-2 px-2 py-3 text-center transition-all",
                "hover:border-blue-400",
                isSelected
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                  : "border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950",
              )}
            >
              {isSelected && (
                <Check className="absolute right-1 top-1 h-3 w-3 text-blue-500" />
              )}
              <span className="text-2xl leading-none">{opt.emoji}</span>
              <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">
                {lang === "th" ? opt.labelTh : opt.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
