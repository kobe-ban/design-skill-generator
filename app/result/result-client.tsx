"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Download, RotateCcw, Check, FileText, Eye } from "lucide-react";
import { useQuizStore } from "@/lib/store";
import { generateSkillMarkdown } from "@/lib/skill-generator";
import { WebsitePreview } from "@/components/website-preview";
import { cn } from "@/lib/utils";

export function ResultClient() {
  const { answers, reset } = useQuizStore();
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [tab, setTab] = useState<"preview" | "skill">("preview");

  useEffect(() => {
    setHydrated(true);
  }, []);

  const markdown = useMemo(() => generateSkillMarkdown(answers), [answers]);

  const onCopy = async () => {
    await navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const onDownload = () => {
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "skill.md";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!hydrated) {
    return (
      <div className="mx-auto flex min-h-screen max-w-4xl items-center justify-center px-4">
        <div className="text-sm text-neutral-500">กำลังโหลด...</div>
      </div>
    );
  }

  const hasAnswers =
    answers.visualStyle ||
    answers.motion ||
    answers.colorMood ||
    answers.palette ||
    answers.typoVibe ||
    answers.fonts ||
    answers.layout ||
    answers.mood;

  if (!hasAnswers) {
    return (
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">ยังไม่มีคำตอบ</h1>
        <p className="text-neutral-600 dark:text-neutral-400">
          เริ่ม quiz เพื่อสร้าง skill.md ของคุณ
        </p>
        <Link
          href="/quiz/1"
          className="rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600"
        >
          เริ่ม Quiz
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950">
      <header className="sticky top-0 z-20 border-b border-neutral-200 bg-white/80 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            ← Choose
          </Link>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-green-500" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied!" : "Copy md"}
            </button>
            <button
              type="button"
              onClick={onDownload}
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-600"
            >
              <Download className="h-3.5 w-3.5" /> Download skill.md
            </button>
            <button
              type="button"
              onClick={() => {
                if (confirm("ลบคำตอบทั้งหมดและเริ่มใหม่?")) {
                  reset();
                  window.location.href = "/quiz/1";
                }
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-white px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-300"
            >
              <RotateCcw className="h-3.5 w-3.5" /> เริ่มใหม่
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-4">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            สรุป Style Guide ของคุณ
          </h1>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            ตัวอย่างเว็บที่ใช้สไตล์ที่คุณเลือก พร้อม skill.md ที่นำไปวางใน{" "}
            <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-xs dark:bg-neutral-800">
              ~/.claude/skills/project-style-guide/SKILL.md
            </code>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900/50">
            <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
              สรุปการเลือก
            </h2>
            <SummaryItem label="Visual" value={answers.visualStyle} />
            <SummaryItem label="Motion" value={answers.motion} />
            <SummaryItem label="Color Mood" value={answers.colorMood} />
            <SummaryItem label="Palette" value={answers.palette?.name} />
            {answers.palette && (
              <div className="flex h-6 overflow-hidden rounded">
                {[
                  answers.palette.primary,
                  answers.palette.secondary,
                  answers.palette.accent,
                  answers.palette.background,
                  answers.palette.foreground,
                ].map((c, i) => (
                  <div key={i} className="flex-1" style={{ backgroundColor: c }} />
                ))}
              </div>
            )}
            <SummaryItem label="Typo vibe" value={answers.typoVibe} />
            <SummaryItem
              label="Fonts"
              value={
                answers.fonts
                  ? `${answers.fonts.display.family} + ${answers.fonts.body.family}`
                  : undefined
              }
            />
            <SummaryItem label="Layout" value={answers.layout} />
            <SummaryItem label="Detail" value={answers.mood?.detailLevel} />
            <SummaryItem label="Audience" value={answers.mood?.audience} />
            <SummaryItem label="Brand" value={answers.mood?.brandVibe} />
          </aside>

          <section>
            <div className="mb-3 flex gap-2 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
              <button
                type="button"
                onClick={() => setTab("preview")}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  tab === "preview"
                    ? "bg-white shadow dark:bg-neutral-700"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400",
                )}
              >
                <Eye className="h-4 w-4" /> Live Website Preview
              </button>
              <button
                type="button"
                onClick={() => setTab("skill")}
                className={cn(
                  "flex-1 inline-flex items-center justify-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  tab === "skill"
                    ? "bg-white shadow dark:bg-neutral-700"
                    : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400",
                )}
              >
                <FileText className="h-4 w-4" /> skill.md
              </button>
            </div>

            {tab === "preview" ? (
              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
                <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-3 py-2 dark:border-neutral-800 dark:bg-neutral-900">
                  <div className="flex gap-1">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="ml-3 flex-1 truncate rounded bg-white px-2 py-0.5 text-xs text-neutral-500 dark:bg-neutral-800">
                    https://your-project.com
                  </div>
                </div>
                <WebsitePreview answers={answers} />
              </div>
            ) : (
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
                <div className="mb-3 flex items-center justify-between">
                  <h2 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    skill.md preview
                  </h2>
                  <span className="text-xs text-neutral-500">{markdown.length} chars</span>
                </div>
                <pre className="max-h-[600px] overflow-auto whitespace-pre-wrap rounded-lg bg-neutral-50 p-4 font-mono text-xs text-neutral-800 dark:bg-neutral-900 dark:text-neutral-200">
                  {markdown}
                </pre>
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-2 border-b border-neutral-100 py-1 dark:border-neutral-800">
      <span className="text-[10px] uppercase tracking-wider text-neutral-500">{label}</span>
      <span className="truncate text-xs font-medium text-neutral-900 dark:text-neutral-100">
        {value ?? "—"}
      </span>
    </div>
  );
}
