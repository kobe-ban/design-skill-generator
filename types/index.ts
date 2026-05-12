export type VisualStyleId =
  | "glassmorphism"
  | "skeuomorphism"
  | "neumorphism"
  | "flat"
  | "material"
  | "brutalism"
  | "minimalism";

export type MotionLevelId = "static" | "subtle" | "heavy" | "parallax";

export type ColorMoodId =
  | "warm"
  | "cool"
  | "neutral"
  | "high-contrast"
  | "pastel"
  | "earthy"
  | "vibrant";

export type TypographyVibeId =
  | "serif-elegant"
  | "sans-modern"
  | "display-playful"
  | "mono-technical"
  | "hand-script"
  | "mixed";

export type LayoutId =
  | "grid-12"
  | "asymmetric"
  | "whitespace-heavy"
  | "compact"
  | "magazine";

export type ScaleRatio = 1.2 | 1.25 | 1.333 | 1.5 | 1.618;

export interface Palette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  foreground: string;
  muted: string;
  border: string;
  mode: "light" | "dark";
}

export interface FontChoice {
  family: string;
  weights: number[];
  category: "serif" | "sans-serif" | "display" | "monospace" | "handwriting";
  thaiSupport: boolean;
}

export interface MoodAnswers {
  detailLevel?: "minimal" | "balanced" | "detailed";
  audience?: "kids" | "youth" | "adult" | "professional" | "senior";
  brandVibe?: "playful" | "serious" | "luxury" | "tech" | "friendly";
}

export interface QuizAnswers {
  visualStyle?: VisualStyleId;
  motion?: MotionLevelId;
  colorMood?: ColorMoodId;
  palette?: Palette;
  typoVibe?: TypographyVibeId;
  fonts?: {
    display: FontChoice;
    body: FontChoice;
    scale: ScaleRatio;
  };
  layout?: LayoutId;
  mood?: MoodAnswers;
}

export interface StyleOption<T extends string> {
  id: T;
  label: string;
  labelTh: string;
  description: string;
  descriptionTh: string;
}
