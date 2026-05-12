import Link from "next/link";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col bg-neutral-50 dark:bg-neutral-950">
      <header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
          <Link
            href="/"
            className="text-sm font-semibold text-neutral-900 dark:text-neutral-100"
          >
            ← Choose
          </Link>
          <span className="text-xs text-neutral-500">Style Quiz</span>
        </div>
      </header>
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col overflow-hidden px-4">
        {children}
      </main>
    </div>
  );
}
