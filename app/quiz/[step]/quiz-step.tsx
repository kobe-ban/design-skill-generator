"use client";

import { useState } from "react";
import { ProgressStepper } from "@/components/progress-stepper";
import { QuizNav } from "@/components/quiz-nav";
import { VisualGrid } from "@/components/visual-grid";
import { QuestionCard } from "@/components/question-card";
import { StylePreview } from "@/components/style-previews";
import { MotionPreview } from "@/components/motion-previews";
import { LayoutPreview } from "@/components/layout-preview";
import { PaletteCard } from "@/components/color/palette-card";
import { ColorPicker } from "@/components/color/color-picker";
import { FontPairCard } from "@/components/typography/font-pair-card";
import { GoogleFontsPicker } from "@/components/typography/google-fonts-picker";
import { VibePreview } from "@/components/typography/vibe-preview";
import { useQuizStore, stepTitles } from "@/lib/store";
import { visualStyles, motionLevels, layouts } from "@/lib/styles-data";
import { colorMoods, presetPalettes } from "@/lib/color-data";
import { curatedPairs } from "@/lib/google-fonts";
import { moodQuestions } from "@/lib/questions";
import type { MoodAnswers, QuizAnswers, ScaleRatio, TypographyVibeId } from "@/types";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export function QuizStep({ step }: { step: number }) {
  const { answers } = useQuizStore();
  const title = stepTitles[step];

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 space-y-2 py-3">
        <ProgressStepper current={step} />
        <div>
          <h1 className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
            {title?.th}
          </h1>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
          {step === 1 && <Step1 />}
          {step === 2 && <Step2 />}
          {step === 3 && <Step3 />}
          {step === 4 && <Step4 />}
          {step === 5 && <Step5 />}
          {step === 6 && <Step6 />}
          {step === 7 && <Step7 />}
          {step === 8 && <Step8 />}
        </div>
      </div>

      <div className="shrink-0 py-3">
        <QuizNav step={step} canProceed={canProceedFromStep(step, answers)} />
      </div>
    </div>
  );
}

function canProceedFromStep(step: number, a: QuizAnswers) {
  switch (step) {
    case 1: return !!a.visualStyle;
    case 2: return !!a.motion;
    case 3: return !!a.colorMood;
    case 4: return !!a.palette;
    case 5: return !!a.typoVibe;
    case 6: return !!a.fonts;
    case 7: return !!a.layout;
    case 8: return !!a.mood?.detailLevel && !!a.mood?.audience && !!a.mood?.brandVibe;
    default: return false;
  }
}

export function Step1() {
  const { answers, setAnswer } = useQuizStore();
  return (
    <VisualGrid
      items={visualStyles}
      selected={answers.visualStyle}
      onSelect={(id) => setAnswer("visualStyle", id)}
      renderPreview={(id) => <StylePreview id={id} />}
      columns={4}
    />
  );
}

export function Step2() {
  const { answers, setAnswer } = useQuizStore();
  return (
    <VisualGrid
      items={motionLevels}
      selected={answers.motion}
      onSelect={(id) => setAnswer("motion", id)}
      renderPreview={(id) => <MotionPreview id={id} />}
      columns={4}
    />
  );
}

export function Step3() {
  const { answers, setAnswer } = useQuizStore();
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {colorMoods.map((m) => {
        const isSel = answers.colorMood === m.id;
        return (
          <button
            key={m.id}
            type="button"
            onClick={() => setAnswer("colorMood", m.id)}
            className={cn(
              "relative flex flex-col gap-2 rounded-xl border-2 bg-white p-3 text-left transition-all dark:bg-neutral-950",
              isSel
                ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20"
                : "border-neutral-200 hover:border-blue-300 dark:border-neutral-800",
            )}
          >
            {isSel && (
              <div className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className="flex h-10 overflow-hidden rounded-md">
              {m.swatches.map((c, i) => (
                <div key={i} className="flex-1" style={{ backgroundColor: c }} />
              ))}
            </div>
            <div>
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {m.labelTh}
              </div>
              <div className="line-clamp-2 text-[11px] leading-tight text-neutral-600 dark:text-neutral-400">
                {m.descriptionTh}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function Step4() {
  const { answers, setAnswer } = useQuizStore();
  const [tab, setTab] = useState<"preset" | "custom">("preset");

  return (
    <div className="space-y-3">
      <div className="flex gap-2 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
        {(["preset", "custom"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              tab === t
                ? "bg-white shadow dark:bg-neutral-700"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400",
            )}
          >
            {t === "preset" ? "Preset (10 ชุด)" : "Custom Color Picker"}
          </button>
        ))}
      </div>

      {tab === "preset" ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {presetPalettes.map((p) => (
            <PaletteCard
              key={p.id}
              palette={p}
              selected={answers.palette?.id === p.id}
              onClick={() => setAnswer("palette", p)}
            />
          ))}
        </div>
      ) : (
        <ColorPicker
          onPaletteGenerated={(p) => setAnswer("palette", p)}
          selectedPaletteId={answers.palette?.id}
        />
      )}

      {answers.palette && (
        <MiniPalettePreview palette={answers.palette} />
      )}
    </div>
  );
}

function MiniPalettePreview({ palette }: { palette: NonNullable<QuizAnswers["palette"]> }) {
  return (
    <div
      className="flex items-center gap-3 rounded-xl border p-3"
      style={{
        backgroundColor: palette.background,
        borderColor: palette.border,
        color: palette.foreground,
      }}
    >
      <button
        type="button"
        className="rounded-md px-3 py-1.5 text-xs font-medium"
        style={{ backgroundColor: palette.primary, color: palette.background }}
      >
        Primary
      </button>
      <button
        type="button"
        className="rounded-md px-3 py-1.5 text-xs font-medium"
        style={{ backgroundColor: palette.accent, color: palette.background }}
      >
        Accent
      </button>
      <span className="text-xs opacity-70">Live preview · {palette.name}</span>
    </div>
  );
}

export function Step5() {
  const { answers, setAnswer } = useQuizStore();
  const vibes: { id: TypographyVibeId; labelTh: string; descriptionTh: string }[] = [
    { id: "serif-elegant", labelTh: "เซริฟหรู", descriptionTh: "พรีเมียม สไตล์บรรณาธิการ" },
    { id: "sans-modern", labelTh: "ซานส์ทันสมัย", descriptionTh: "เป็นกลาง ทันสมัย" },
    { id: "display-playful", labelTh: "Display ขี้เล่น", descriptionTh: "มีคาแรกเตอร์ เป็นพระเอก" },
    { id: "mono-technical", labelTh: "Mono เทคนิค", descriptionTh: "เครื่องมือ dev เน้นโค้ด" },
    { id: "hand-script", labelTh: "ลายมือ", descriptionTh: "ไม่เป็นทางการ เป็นมนุษย์" },
    { id: "mixed", labelTh: "ผสม", descriptionTh: "Display + body คนละแบบ" },
  ];
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
      {vibes.map((v) => {
        const isSel = answers.typoVibe === v.id;
        return (
          <button
            key={v.id}
            type="button"
            onClick={() => setAnswer("typoVibe", v.id)}
            className={cn(
              "relative flex flex-col gap-2 rounded-xl border-2 bg-white p-2 text-left transition-all dark:bg-neutral-950",
              isSel
                ? "border-blue-500 shadow-lg ring-2 ring-blue-500/20"
                : "border-neutral-200 hover:border-blue-300 dark:border-neutral-800",
            )}
          >
            {isSel && (
              <div className="absolute right-2 top-2 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                <Check className="h-3 w-3" />
              </div>
            )}
            <div className="aspect-[4/3] overflow-hidden rounded-md">
              <VibePreview id={v.id} />
            </div>
            <div className="px-1 pb-1">
              <div className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {v.labelTh}
              </div>
              <div className="line-clamp-2 text-[11px] leading-tight text-neutral-600 dark:text-neutral-400">
                {v.descriptionTh}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

export function Step6() {
  const { answers, setAnswer } = useQuizStore();
  const [tab, setTab] = useState<"curated" | "browse">("curated");

  return (
    <div className="space-y-3">
      <div className="flex gap-2 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
        {(["curated", "browse"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              "flex-1 rounded-md px-3 py-1 text-xs font-medium transition-colors",
              tab === t
                ? "bg-white shadow dark:bg-neutral-700"
                : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400",
            )}
          >
            {t === "curated" ? "คู่ฟอนต์แนะนำ (8)" : "Browse Google Fonts (รวมไทย)"}
          </button>
        ))}
      </div>

      {tab === "curated" ? (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {curatedPairs.map((p) => (
            <FontPairCard
              key={p.id}
              pair={p}
              selected={
                answers.fonts?.display.family === p.display.family &&
                answers.fonts?.body.family === p.body.family
              }
              onClick={() =>
                setAnswer("fonts", {
                  display: {
                    family: p.display.family,
                    weights: p.display.weights,
                    category: p.display.category,
                    thaiSupport: p.display.thaiSupport,
                  },
                  body: {
                    family: p.body.family,
                    weights: p.body.weights,
                    category: p.body.category,
                    thaiSupport: p.body.thaiSupport,
                  },
                  scale: 1.25 as ScaleRatio,
                })
              }
            />
          ))}
        </div>
      ) : (
        <GoogleFontsPicker
          value={answers.fonts}
          onChange={(v) => setAnswer("fonts", v)}
        />
      )}
    </div>
  );
}

export function Step7() {
  const { answers, setAnswer } = useQuizStore();
  return (
    <VisualGrid
      items={layouts}
      selected={answers.layout}
      onSelect={(id) => setAnswer("layout", id)}
      renderPreview={(id) => <LayoutPreview id={id} />}
      columns={5}
    />
  );
}

export function Step8() {
  const { answers, setAnswer } = useQuizStore();
  const mood = answers.mood ?? {};

  return (
    <div className="space-y-4">
      {moodQuestions.map((q) => (
        <QuestionCard
          key={q.id}
          question={q}
          value={mood[q.id]}
          onChange={(v) =>
            setAnswer("mood", { ...mood, [q.id]: v } as MoodAnswers)
          }
        />
      ))}
    </div>
  );
}
