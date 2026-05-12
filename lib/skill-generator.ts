import type { QuizAnswers } from "@/types";
import { visualStyles, motionLevels, layouts } from "./styles-data";
import { colorMoods } from "./color-data";
import { paletteContrastReport, hslString } from "./color-utils";
import { googleFontsUrl, scaleRatios } from "./google-fonts";
import { moodQuestions } from "./questions";

function lookupVisual(id?: string) {
  return visualStyles.find((v) => v.id === id);
}

function lookupMotion(id?: string) {
  return motionLevels.find((m) => m.id === id);
}

function lookupLayout(id?: string) {
  return layouts.find((l) => l.id === id);
}

function lookupColorMood(id?: string) {
  return colorMoods.find((c) => c.id === id);
}

function lookupScale(value?: number) {
  return scaleRatios.find((s) => s.value === value);
}

function moodSummary(mood?: QuizAnswers["mood"]) {
  if (!mood) return "ไม่ระบุ";
  const lines: string[] = [];
  for (const q of moodQuestions) {
    const v = mood[q.id];
    if (!v) continue;
    const opt = q.options.find((o) => o.value === v);
    if (opt) lines.push(`- **${q.questionTh}** → ${opt.labelTh}`);
  }
  return lines.length ? lines.join("\n") : "ไม่ระบุ";
}

export function generateSkillMarkdown(answers: QuizAnswers): string {
  const visual = lookupVisual(answers.visualStyle);
  const motion = lookupMotion(answers.motion);
  const colorMood = lookupColorMood(answers.colorMood);
  const palette = answers.palette;
  const fonts = answers.fonts;
  const layout = lookupLayout(answers.layout);
  const scale = fonts ? lookupScale(fonts.scale) : undefined;

  const fontUrl = fonts
    ? googleFontsUrl([
        { family: fonts.display.family, weights: fonts.display.weights },
        { family: fonts.body.family, weights: fonts.body.weights },
      ])
    : "";

  const contrastReport = palette ? paletteContrastReport(palette) : null;

  const tailwindTokens = palette
    ? [
        `--color-primary: ${palette.primary};`,
        `--color-secondary: ${palette.secondary};`,
        `--color-accent: ${palette.accent};`,
        `--color-background: ${palette.background};`,
        `--color-foreground: ${palette.foreground};`,
        `--color-muted: ${palette.muted};`,
        `--color-border: ${palette.border};`,
      ].join("\n  ")
    : "";

  const nextFontSnippet = fonts
    ? [
        `import { ${fonts.display.family.replace(/ /g, "_")} as DisplayFont, ${fonts.body.family.replace(/ /g, "_")} as BodyFont } from "next/font/google";`,
        ``,
        `export const displayFont = DisplayFont({`,
        `  subsets: [${fonts.display.thaiSupport ? '"latin", "thai"' : '"latin"'}],`,
        `  weight: [${fonts.display.weights.map((w) => `"${w}"`).join(", ")}],`,
        `  variable: "--font-display",`,
        `});`,
        ``,
        `export const bodyFont = BodyFont({`,
        `  subsets: [${fonts.body.thaiSupport ? '"latin", "thai"' : '"latin"'}],`,
        `  weight: [${fonts.body.weights.map((w) => `"${w}"`).join(", ")}],`,
        `  variable: "--font-body",`,
        `});`,
      ].join("\n")
    : "";

  return `---
name: project-style-guide
description: Design style preferences for new projects — apply this style guide whenever creating UI components, pages, or design tokens.
---

# Project Style Guide

ใช้ skill นี้เป็น reference เมื่อสร้าง UI components / pages ใหม่สำหรับโปรเจคนี้ ทุกครั้ง

## 1. Visual Style: ${visual?.label ?? "—"} (${visual?.labelTh ?? "—"})

${visual?.descriptionTh ?? ""}

**Implementation guideline:**
${visual?.guideline ?? "—"}

**Tailwind tokens (reference):**
- Background: \`${visual?.cssTokens.background ?? ""}\`
- Border: \`${visual?.cssTokens.border ?? ""}\`
- Shadow: \`${visual?.cssTokens.shadow ?? ""}\`
- Radius: \`${visual?.cssTokens.radius ?? ""}\`
${visual?.cssTokens.extras ? `- Extras: \`${visual.cssTokens.extras}\`` : ""}

## 2. Motion: ${motion?.label ?? "—"} (${motion?.labelTh ?? "—"})

${motion?.descriptionTh ?? ""}

- **Default duration**: ${motion?.duration ?? 0}ms
- **Easing**: ${motion?.easing ?? "—"}
- **Triggers**: ${motion?.triggers.join(", ") ?? "—"}

**Guideline:** ${motion?.guideline ?? "—"}

## 3. Color Mood: ${colorMood?.label ?? "—"} (${colorMood?.labelTh ?? "—"})

${colorMood?.descriptionTh ?? ""}

## 4. Color Palette${palette ? `: ${palette.name}` : ""}

${
  palette
    ? `| Token | Hex | HSL |
|-------|-----|-----|
| Primary | \`${palette.primary}\` | \`${hslString(palette.primary)}\` |
| Secondary | \`${palette.secondary}\` | \`${hslString(palette.secondary)}\` |
| Accent | \`${palette.accent}\` | \`${hslString(palette.accent)}\` |
| Background | \`${palette.background}\` | \`${hslString(palette.background)}\` |
| Foreground | \`${palette.foreground}\` | \`${hslString(palette.foreground)}\` |
| Muted | \`${palette.muted}\` | \`${hslString(palette.muted)}\` |
| Border | \`${palette.border}\` | \`${hslString(palette.border)}\` |

- **Mode**: ${palette.mode}
${
  contrastReport
    ? `- **WCAG contrast**: foreground/background = ${contrastReport.fgOnBg.toFixed(2)}, primary/background = ${contrastReport.primaryOnBg.toFixed(2)}, accent/background = ${contrastReport.accentOnBg.toFixed(2)}`
    : ""
}

### Tailwind v4 \`@theme\` (paste into \`globals.css\`)
\`\`\`css
@theme {
  ${tailwindTokens}
}
\`\`\``
    : "ไม่ได้เลือก palette"
}

## 5. Typography${fonts ? `: ${fonts.display.family} + ${fonts.body.family}` : ""}

${
  fonts
    ? `- **Display**: ${fonts.display.family} (weights: ${fonts.display.weights.join(", ")})${fonts.display.thaiSupport ? " · TH ✓" : ""}
- **Body**: ${fonts.body.family} (weights: ${fonts.body.weights.join(", ")})${fonts.body.thaiSupport ? " · TH ✓" : ""}
- **Scale ratio**: ${fonts.scale}${scale ? ` (${scale.name} — ${scale.description})` : ""}
- **Google Fonts URL**: \`${fontUrl}\`

### \`next/font/google\` setup (paste into \`app/fonts.ts\`)
\`\`\`ts
${nextFontSnippet}
\`\`\`

ใช้ใน root layout: \`<html className={\`\${displayFont.variable} \${bodyFont.variable}\`}>\``
    : "ไม่ได้เลือก typography"
}

## 6. Layout & Density: ${layout?.label ?? "—"} (${layout?.labelTh ?? "—"})

${layout?.descriptionTh ?? ""}

- **Spacing scale**: ${layout?.spacingScale ?? "—"}
- **Guideline**: ${layout?.guideline ?? "—"}

## 7. Mood & Brand

${moodSummary(answers.mood)}

---

## Implementation Checklist

เมื่อสร้าง component / page ใหม่ ตรวจสอบว่า:

- [ ] ใช้ visual style ที่กำหนด (Tailwind tokens ตามตารางข้างบน)
- [ ] motion อยู่ในระดับ "${motion?.label ?? "—"}" — ห้ามเกินกำหนด
- [ ] ใช้สีจาก palette เท่านั้น (อ้างอิง CSS variables)
- [ ] typography ตาม scale (display + body)
- [ ] layout ตามแนวทาง "${layout?.label ?? "—"}"
- [ ] WCAG contrast ผ่าน AA (4.5+) สำหรับข้อความ

## Reference snippet — ตัวอย่าง Card

\`\`\`tsx
<div className="${visual?.cssTokens.background ?? ""} ${visual?.cssTokens.border ?? ""} ${visual?.cssTokens.shadow ?? ""} ${visual?.cssTokens.radius ?? ""} ${visual?.cssTokens.extras ?? ""} p-6">
  <h3 style={{ fontFamily: "var(--font-display)" }}>Card Title</h3>
  <p style={{ fontFamily: "var(--font-body)" }}>Body content</p>
</div>
\`\`\`
`;
}
