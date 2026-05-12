"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { QuizAnswers } from "@/types";

interface QuizState {
  answers: QuizAnswers;
  setAnswer: <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;
  setAnswers: (partial: Partial<QuizAnswers>) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (key, value) =>
        set((state) => ({ answers: { ...state.answers, [key]: value } })),
      setAnswers: (partial) =>
        set((state) => ({ answers: { ...state.answers, ...partial } })),
      reset: () => set({ answers: {} }),
    }),
    {
      name: "choose-style-quiz",
    },
  ),
);

export const TOTAL_STEPS = 8;

export const stepTitles: Record<number, { en: string; th: string }> = {
  1: { en: "Visual Style", th: "สไตล์ภาพรวม" },
  2: { en: "Motion & Animation", th: "การเคลื่อนไหว" },
  3: { en: "Color Mood", th: "บรรยากาศของสี" },
  4: { en: "Color Palette", th: "ชุดสี" },
  5: { en: "Typography Vibe", th: "บรรยากาศตัวอักษร" },
  6: { en: "Font Selection", th: "เลือกฟอนต์" },
  7: { en: "Layout & Density", th: "เลย์เอาต์" },
  8: { en: "Mood & Brand", th: "อารมณ์และแบรนด์" },
};
