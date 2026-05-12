import { hsl, parse, formatHex, formatHsl, wcagContrast } from "culori";
import type { Palette } from "@/types";

export function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const c = hsl(parse(hex));
  if (!c) return { h: 0, s: 0, l: 0 };
  return {
    h: c.h ?? 0,
    s: (c.s ?? 0) * 100,
    l: (c.l ?? 0) * 100,
  };
}

export function hslToHex(h: number, s: number, l: number): string {
  const out = formatHex({ mode: "hsl", h, s: s / 100, l: l / 100 });
  return out ?? "#000000";
}

export function hslString(hex: string): string {
  const c = hsl(parse(hex));
  if (!c) return "0 0% 0%";
  return `${Math.round(c.h ?? 0)} ${Math.round((c.s ?? 0) * 100)}% ${Math.round((c.l ?? 0) * 100)}%`;
}

export function contrastRatio(fg: string, bg: string): number {
  const ratio = wcagContrast(fg, bg);
  return Math.round(ratio * 100) / 100;
}

export type ContrastGrade = "AAA" | "AA" | "AA Large" | "Fail";

export function contrastGrade(ratio: number, large = false): ContrastGrade {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (large && ratio >= 3) return "AA Large";
  return "Fail";
}

type Harmony =
  | "complementary"
  | "analogous"
  | "triadic"
  | "split-complementary"
  | "tetradic";

export function harmonyFromHex(
  base: string,
  harmony: Harmony = "complementary",
): string[] {
  const c = hexToHsl(base);
  const shifts: Record<Harmony, number[]> = {
    complementary: [0, 180],
    analogous: [0, 30, -30],
    triadic: [0, 120, 240],
    "split-complementary": [0, 150, 210],
    tetradic: [0, 90, 180, 270],
  };
  return shifts[harmony].map((d) => hslToHex((c.h + d + 360) % 360, c.s, c.l));
}

export function generatePaletteFromHex(primary: string): Palette {
  const baseHsl = hexToHsl(primary);
  const isDark = baseHsl.l < 50;

  const secondary = hslToHex(
    (baseHsl.h + 30) % 360,
    Math.max(20, baseHsl.s * 0.8),
    baseHsl.l,
  );
  const accent = hslToHex(
    (baseHsl.h + 180) % 360,
    Math.min(80, baseHsl.s),
    Math.min(70, baseHsl.l + 10),
  );

  const background = isDark
    ? hslToHex(baseHsl.h, Math.min(20, baseHsl.s), 8)
    : hslToHex(baseHsl.h, Math.min(15, baseHsl.s), 98);

  const foreground = isDark
    ? hslToHex(baseHsl.h, 10, 95)
    : hslToHex(baseHsl.h, 25, 12);

  const muted = isDark
    ? hslToHex(baseHsl.h, 15, 15)
    : hslToHex(baseHsl.h, 12, 95);

  const border = isDark
    ? hslToHex(baseHsl.h, 15, 22)
    : hslToHex(baseHsl.h, 15, 88);

  return {
    id: "custom",
    name: "Custom",
    primary,
    secondary,
    accent,
    background,
    foreground,
    muted,
    border,
    mode: isDark ? "dark" : "light",
  };
}

export function deriveDarkVariant(p: Palette): Palette {
  if (p.mode === "dark") return p;
  return {
    ...p,
    id: `${p.id}-dark`,
    name: `${p.name} (Dark)`,
    background: hslToHex(hexToHsl(p.background).h, 20, 8),
    foreground: hslToHex(hexToHsl(p.foreground).h, 10, 95),
    muted: hslToHex(hexToHsl(p.muted).h, 15, 15),
    border: hslToHex(hexToHsl(p.border).h, 15, 22),
    mode: "dark",
  };
}

export function paletteToTailwindTokens(p: Palette): string {
  return [
    `--color-primary: ${p.primary};`,
    `--color-secondary: ${p.secondary};`,
    `--color-accent: ${p.accent};`,
    `--color-background: ${p.background};`,
    `--color-foreground: ${p.foreground};`,
    `--color-muted: ${p.muted};`,
    `--color-border: ${p.border};`,
  ].join("\n  ");
}

export function paletteContrastReport(p: Palette) {
  return {
    primaryOnBg: contrastRatio(p.primary, p.background),
    fgOnBg: contrastRatio(p.foreground, p.background),
    accentOnBg: contrastRatio(p.accent, p.background),
  };
}

export { formatHsl };
