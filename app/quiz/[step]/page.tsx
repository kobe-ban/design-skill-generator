import { notFound } from "next/navigation";
import { TOTAL_STEPS } from "@/lib/store";
import { QuizStep } from "./quiz-step";

export default async function QuizStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  const stepNum = Number(step);
  if (!Number.isInteger(stepNum) || stepNum < 1 || stepNum > TOTAL_STEPS) {
    notFound();
  }
  return <QuizStep step={stepNum} />;
}

export function generateStaticParams() {
  return Array.from({ length: TOTAL_STEPS }, (_, i) => ({ step: String(i + 1) }));
}
