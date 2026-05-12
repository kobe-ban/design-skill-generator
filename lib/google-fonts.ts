import type { FontChoice } from "@/types";

export interface GoogleFontEntry {
  family: string;
  category: FontChoice["category"];
  weights: number[];
  thaiSupport: boolean;
  vibe: ("serif-elegant" | "sans-modern" | "display-playful" | "mono-technical" | "hand-script")[];
}

export const googleFontsCatalog: GoogleFontEntry[] = [
  // Sans modern
  { family: "Inter", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Manrope", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "DM Sans", category: "sans-serif", weights: [400, 500, 700], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Plus Jakarta Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700, 800], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Geist", category: "sans-serif", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Outfit", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Space Grotesk", category: "sans-serif", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["sans-modern", "display-playful"] },
  { family: "Lato", category: "sans-serif", weights: [300, 400, 700], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Poppins", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: false, vibe: ["sans-modern"] },
  { family: "Work Sans", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: false, vibe: ["sans-modern"] },

  // Thai-supporting Sans
  { family: "Noto Sans Thai", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern"] },
  { family: "IBM Plex Sans Thai", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern"] },
  { family: "Sarabun", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern"] },
  { family: "Prompt", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern", "display-playful"] },
  { family: "Kanit", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern", "display-playful"] },
  { family: "Anuphan", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern"] },
  { family: "Bai Jamjuree", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern"] },
  { family: "Mitr", category: "sans-serif", weights: [300, 400, 500, 600, 700], thaiSupport: true, vibe: ["sans-modern", "display-playful"] },

  // Serif elegant
  { family: "Playfair Display", category: "serif", weights: [400, 600, 700, 800, 900], thaiSupport: false, vibe: ["serif-elegant", "display-playful"] },
  { family: "Cormorant", category: "serif", weights: [300, 400, 500, 600, 700], thaiSupport: false, vibe: ["serif-elegant"] },
  { family: "Lora", category: "serif", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["serif-elegant"] },
  { family: "Fraunces", category: "serif", weights: [400, 500, 600, 700, 800], thaiSupport: false, vibe: ["serif-elegant", "display-playful"] },
  { family: "Crimson Pro", category: "serif", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["serif-elegant"] },

  // Thai-supporting Serif
  { family: "Noto Serif Thai", category: "serif", weights: [400, 500, 600, 700], thaiSupport: true, vibe: ["serif-elegant"] },
  { family: "IBM Plex Serif Thai Looped", category: "serif", weights: [400, 500, 600, 700], thaiSupport: true, vibe: ["serif-elegant"] },

  // Display playful
  { family: "Bricolage Grotesque", category: "display", weights: [400, 500, 600, 700, 800], thaiSupport: false, vibe: ["display-playful"] },
  { family: "Unbounded", category: "display", weights: [300, 400, 500, 600, 700, 800], thaiSupport: false, vibe: ["display-playful"] },
  { family: "Bricolage", category: "display", weights: [400, 600, 800], thaiSupport: false, vibe: ["display-playful"] },

  // Mono technical
  { family: "JetBrains Mono", category: "monospace", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["mono-technical"] },
  { family: "Geist Mono", category: "monospace", weights: [400, 500, 600], thaiSupport: false, vibe: ["mono-technical"] },
  { family: "Fira Code", category: "monospace", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["mono-technical"] },
  { family: "IBM Plex Mono", category: "monospace", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["mono-technical"] },

  // Hand/Script
  { family: "Caveat", category: "handwriting", weights: [400, 500, 600, 700], thaiSupport: false, vibe: ["hand-script"] },
  { family: "Kalam", category: "handwriting", weights: [300, 400, 700], thaiSupport: true, vibe: ["hand-script"] },
];

export interface FontPair {
  id: string;
  name: string;
  display: GoogleFontEntry;
  body: GoogleFontEntry;
  vibe: string;
}

export const curatedPairs: FontPair[] = [
  {
    id: "fraunces-inter",
    name: "Fraunces + Inter",
    display: googleFontsCatalog.find((f) => f.family === "Fraunces")!,
    body: googleFontsCatalog.find((f) => f.family === "Inter")!,
    vibe: "Modern editorial",
  },
  {
    id: "playfair-lato",
    name: "Playfair Display + Lato",
    display: googleFontsCatalog.find((f) => f.family === "Playfair Display")!,
    body: googleFontsCatalog.find((f) => f.family === "Lato")!,
    vibe: "Classic luxury",
  },
  {
    id: "space-inter",
    name: "Space Grotesk + Inter",
    display: googleFontsCatalog.find((f) => f.family === "Space Grotesk")!,
    body: googleFontsCatalog.find((f) => f.family === "Inter")!,
    vibe: "Tech-forward",
  },
  {
    id: "bricolage-dmsans",
    name: "Bricolage + DM Sans",
    display: googleFontsCatalog.find((f) => f.family === "Bricolage Grotesque")!,
    body: googleFontsCatalog.find((f) => f.family === "DM Sans")!,
    vibe: "Playful product",
  },
  {
    id: "kanit-sarabun",
    name: "Kanit + Sarabun (Thai)",
    display: googleFontsCatalog.find((f) => f.family === "Kanit")!,
    body: googleFontsCatalog.find((f) => f.family === "Sarabun")!,
    vibe: "Thai modern",
  },
  {
    id: "prompt-noto",
    name: "Prompt + Noto Sans Thai",
    display: googleFontsCatalog.find((f) => f.family === "Prompt")!,
    body: googleFontsCatalog.find((f) => f.family === "Noto Sans Thai")!,
    vibe: "Thai friendly",
  },
  {
    id: "manrope-mono",
    name: "Manrope + JetBrains Mono",
    display: googleFontsCatalog.find((f) => f.family === "Manrope")!,
    body: googleFontsCatalog.find((f) => f.family === "JetBrains Mono")!,
    vibe: "Developer tool",
  },
  {
    id: "outfit-outfit",
    name: "Outfit (mono-pair)",
    display: googleFontsCatalog.find((f) => f.family === "Outfit")!,
    body: googleFontsCatalog.find((f) => f.family === "Outfit")!,
    vibe: "Minimalist",
  },
];

export const scaleRatios = [
  { value: 1.2, name: "Minor Third", description: "Tight, for dense UI" },
  { value: 1.25, name: "Major Third", description: "Balanced, all-purpose" },
  { value: 1.333, name: "Perfect Fourth", description: "Spacious, editorial" },
  { value: 1.5, name: "Perfect Fifth", description: "Dramatic, hero-heavy" },
  { value: 1.618, name: "Golden Ratio", description: "Classical, elegant" },
] as const;

export function googleFontsUrl(fonts: { family: string; weights: number[] }[]): string {
  const parts = fonts.map((f) => {
    const family = f.family.replace(/ /g, "+");
    const weights = f.weights.sort((a, b) => a - b).join(";");
    return `family=${family}:wght@${weights}`;
  });
  return `https://fonts.googleapis.com/css2?${parts.join("&")}&display=swap`;
}

export function buildScale(base: number, ratio: number): Record<string, number> {
  return {
    xs: Math.round(base / ratio),
    sm: Math.round(base / Math.sqrt(ratio)),
    base,
    lg: Math.round(base * Math.sqrt(ratio)),
    xl: Math.round(base * ratio),
    "2xl": Math.round(base * ratio * Math.sqrt(ratio)),
    "3xl": Math.round(base * ratio ** 2),
    "4xl": Math.round(base * ratio ** 2 * Math.sqrt(ratio)),
    "5xl": Math.round(base * ratio ** 3),
    "6xl": Math.round(base * ratio ** 4),
  };
}
