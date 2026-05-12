import Link from "next/link";
import { ArrowRight, Palette, Sparkles, Type, FileDown } from "lucide-react";

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-1 flex-col overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-purple-950">
      <div className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-500/20" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-500/20" />
      </div>

      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-10 px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/70 px-4 py-1.5 text-xs font-medium text-neutral-700 backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/70 dark:text-neutral-300">
          <Sparkles className="h-3.5 w-3.5 text-blue-500" />
          ช่วยลูกค้าค้นพบสไตล์ที่ใช่
        </div>

        <h1 className="max-w-3xl text-5xl font-bold leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 sm:text-6xl">
          ตอบคำถาม → ได้{" "}
          <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
            skill.md
          </span>{" "}
          พร้อมใช้
        </h1>

        <p className="max-w-2xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          เครื่องมือช่วยลูกค้าเลือกสไตล์การออกแบบ — ครอบคลุม Visual Style, Motion, สี (palette + custom),
          Typography (Google Fonts รองรับไทย), Layout และ Brand Mood
          <br />
          จบ quiz แล้วได้ <code className="rounded bg-neutral-200 px-1.5 py-0.5 text-sm dark:bg-neutral-800">skill.md</code>
          {" "}สำหรับเริ่มโปรเจคใหม่กับ Claude Code ทันที
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/quiz/1"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/30 transition-transform hover:scale-105"
          >
            เริ่ม Quiz <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/result"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-300 bg-white/80 px-6 py-3 text-base font-medium text-neutral-900 backdrop-blur hover:bg-white dark:border-neutral-700 dark:bg-neutral-900/80 dark:text-neutral-100"
          >
            ดูผลที่บันทึกไว้
          </Link>
        </div>

        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Feature
            icon={<Sparkles className="h-5 w-5" />}
            title="Visual & Motion"
            desc="7 visual styles + 4 motion levels พร้อม live preview"
          />
          <Feature
            icon={<Palette className="h-5 w-5" />}
            title="Color Builder"
            desc="10 preset + custom picker + WCAG contrast check"
          />
          <Feature
            icon={<Type className="h-5 w-5" />}
            title="Google Fonts"
            desc="35+ fonts รวมไทย + scale ratio + live preview"
          />
          <Feature
            icon={<FileDown className="h-5 w-5" />}
            title="Export skill.md"
            desc="ได้ Tailwind tokens + next/font snippet พร้อมวาง"
          />
        </div>
      </main>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-start gap-2 rounded-2xl border border-neutral-200 bg-white/80 p-4 text-left backdrop-blur dark:border-neutral-800 dark:bg-neutral-900/80">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
        {icon}
      </div>
      <div className="font-semibold text-neutral-900 dark:text-neutral-100">{title}</div>
      <div className="text-xs text-neutral-600 dark:text-neutral-400">{desc}</div>
    </div>
  );
}
