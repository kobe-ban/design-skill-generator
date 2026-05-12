import { NextResponse } from "next/server";
import { generateSkillMarkdown } from "@/lib/skill-generator";
import type { QuizAnswers } from "@/types";

export async function POST(req: Request) {
  let body: { answers?: QuizAnswers };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!body.answers) {
    return NextResponse.json({ error: "Missing answers" }, { status: 400 });
  }
  const markdown = generateSkillMarkdown(body.answers);
  return new Response(markdown, {
    status: 200,
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Content-Disposition": 'attachment; filename="skill.md"',
    },
  });
}
