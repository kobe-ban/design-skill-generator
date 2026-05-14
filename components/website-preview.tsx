"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import type {
  ColorMoodId,
  LayoutId,
  MoodAnswers,
  MotionLevelId,
  QuizAnswers,
  TypographyVibeId,
  VisualStyleId,
} from "@/types";
import { googleFontsUrl } from "@/lib/google-fonts";

interface WebsitePreviewProps {
  answers: QuizAnswers;
}

const loadedFonts = new Set<string>();

function injectFontLink(href: string) {
  if (typeof document === "undefined") return;
  if (loadedFonts.has(href)) return;
  loadedFonts.add(href);
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  document.head.appendChild(link);
}

interface StyleClasses {
  card: string;
  button: string;
  navItem: string;
  shadow: string;
  radius: string;
  border: string;
}

function getStyleClasses(visualStyle?: VisualStyleId): StyleClasses {
  switch (visualStyle) {
    case "glassmorphism":
      return {
        card: "border border-white/40 bg-white/30 backdrop-blur-xl",
        button: "border border-white/40 backdrop-blur-md",
        navItem: "px-3 py-1.5 rounded-full hover:bg-white/30",
        shadow: "shadow-lg shadow-black/10",
        radius: "rounded-2xl",
        border: "border border-white/30",
      };
    case "skeuomorphism":
      return {
        card: "border bg-gradient-to-b from-white to-neutral-100",
        button:
          "shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_3px_6px_rgba(0,0,0,0.2)] bg-gradient-to-b from-white to-neutral-200",
        navItem: "px-3 py-1.5 rounded-md",
        shadow: "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.15)]",
        radius: "rounded-lg",
        border: "border",
      };
    case "neumorphism":
      return {
        card: "shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]",
        button: "shadow-[4px_4px_8px_rgba(0,0,0,0.1),-4px_-4px_8px_rgba(255,255,255,0.7)]",
        navItem: "px-3 py-1.5 rounded-xl",
        shadow: "shadow-[8px_8px_16px_rgba(0,0,0,0.1),-8px_-8px_16px_rgba(255,255,255,0.7)]",
        radius: "rounded-2xl",
        border: "",
      };
    case "flat":
      return {
        card: "",
        button: "",
        navItem: "px-3 py-1.5",
        shadow: "",
        radius: "",
        border: "",
      };
    case "material":
      return {
        card: "shadow-md",
        button:
          "shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_rgba(0,0,0,0.14)] uppercase tracking-wider text-sm font-medium",
        navItem: "px-3 py-1.5 rounded-md",
        shadow: "shadow-md",
        radius: "rounded-md",
        border: "",
      };
    case "brutalism":
      return {
        card: "border-[3px] border-black",
        button:
          "border-[3px] border-black shadow-[5px_5px_0_0_rgba(0,0,0,1)] font-mono font-black uppercase",
        navItem: "px-3 py-1.5 border-2 border-black font-mono font-bold",
        shadow: "shadow-[5px_5px_0_0_rgba(0,0,0,1)]",
        radius: "rounded-none",
        border: "border-[3px] border-black",
      };
    case "minimalism":
      return {
        card: "border-b",
        button: "border-b-2",
        navItem: "px-3 py-1.5 text-xs uppercase tracking-widest",
        shadow: "",
        radius: "rounded-none",
        border: "border-b",
      };
    default:
      return {
        card: "border",
        button: "",
        navItem: "px-3 py-1.5",
        shadow: "",
        radius: "rounded-lg",
        border: "border",
      };
  }
}

interface LayoutConfig {
  headerPx: string;
  headerPy: string;
  heroPx: string;
  heroPy: string;
  heroAlign: "text-center" | "text-left";
  heroMaxW: string;
  heroFontSize: string;
  heroLeading: string;
  heroSubMaxW: string;
  bodyColumns: string;
  ctaJustify: string;
  featuresPx: string;
  featuresPb: string;
  featuresGridCols: string;
  featuresGap: string;
  cardPadding: string;
  cardTitleSize: string;
  cardBodySize: string;
  footerPx: string;
  footerPy: string;
}

function getLayoutConfig(layout?: LayoutId): LayoutConfig {
  switch (layout) {
    case "compact":
      return {
        headerPx: "px-3",
        headerPy: "py-2",
        heroPx: "px-3",
        heroPy: "py-5",
        heroAlign: "text-center",
        heroMaxW: "max-w-2xl",
        heroFontSize: "text-2xl md:text-3xl",
        heroLeading: "leading-tight",
        heroSubMaxW: "max-w-md",
        bodyColumns: "",
        ctaJustify: "justify-center",
        featuresPx: "px-3",
        featuresPb: "pb-4",
        featuresGridCols: "sm:grid-cols-4",
        featuresGap: "gap-2",
        cardPadding: "p-2",
        cardTitleSize: "text-sm",
        cardBodySize: "text-[10px]",
        footerPx: "px-3",
        footerPy: "py-2",
      };
    case "whitespace-heavy":
      return {
        headerPx: "px-10",
        headerPy: "py-6",
        heroPx: "px-10",
        heroPy: "py-16",
        heroAlign: "text-center",
        heroMaxW: "max-w-3xl",
        heroFontSize: "text-5xl md:text-6xl",
        heroLeading: "leading-[1.05]",
        heroSubMaxW: "max-w-lg",
        bodyColumns: "",
        ctaJustify: "justify-center",
        featuresPx: "px-10",
        featuresPb: "pb-16",
        featuresGridCols: "sm:grid-cols-3",
        featuresGap: "gap-8",
        cardPadding: "p-8",
        cardTitleSize: "text-lg",
        cardBodySize: "text-sm",
        footerPx: "px-10",
        footerPy: "py-6",
      };
    case "magazine":
      return {
        headerPx: "px-8",
        headerPy: "py-4",
        heroPx: "px-8",
        heroPy: "py-10",
        heroAlign: "text-left",
        heroMaxW: "max-w-4xl",
        heroFontSize: "text-6xl md:text-7xl",
        heroLeading: "leading-[0.95]",
        heroSubMaxW: "max-w-2xl",
        bodyColumns: "sm:columns-2 sm:gap-6",
        ctaJustify: "justify-start",
        featuresPx: "px-8",
        featuresPb: "pb-10",
        featuresGridCols: "sm:grid-cols-2 lg:grid-cols-3",
        featuresGap: "gap-6",
        cardPadding: "p-5",
        cardTitleSize: "text-xl",
        cardBodySize: "text-sm",
        footerPx: "px-8",
        footerPy: "py-4",
      };
    case "asymmetric":
      return {
        headerPx: "px-6",
        headerPy: "py-4",
        heroPx: "pl-10 pr-6",
        heroPy: "py-12",
        heroAlign: "text-left",
        heroMaxW: "max-w-xl",
        heroFontSize: "text-5xl md:text-6xl",
        heroLeading: "leading-tight",
        heroSubMaxW: "max-w-md",
        bodyColumns: "",
        ctaJustify: "justify-start",
        featuresPx: "px-6",
        featuresPb: "pb-10",
        featuresGridCols: "sm:grid-cols-[2fr_1fr_1fr]",
        featuresGap: "gap-4",
        cardPadding: "p-4",
        cardTitleSize: "text-base",
        cardBodySize: "text-xs",
        footerPx: "px-6",
        footerPy: "py-3",
      };
    case "grid-12":
    default:
      return {
        headerPx: "px-6",
        headerPy: "py-4",
        heroPx: "px-6",
        heroPy: "py-10",
        heroAlign: "text-center",
        heroMaxW: "max-w-2xl",
        heroFontSize: "text-4xl md:text-5xl",
        heroLeading: "leading-tight",
        heroSubMaxW: "max-w-md",
        bodyColumns: "",
        ctaJustify: "justify-center",
        featuresPx: "px-6",
        featuresPb: "pb-8",
        featuresGridCols: "sm:grid-cols-3",
        featuresGap: "gap-3",
        cardPadding: "p-4",
        cardTitleSize: "text-base",
        cardBodySize: "text-xs",
        footerPx: "px-6",
        footerPy: "py-3",
      };
  }
}

interface MotionConfig {
  enabled: boolean;
  duration: number;
  stagger: number;
  yOffset: number;
  spring: boolean;
}

function getMotionConfig(level?: MotionLevelId): MotionConfig {
  switch (level) {
    case "subtle":
      return { enabled: true, duration: 0.3, stagger: 0.05, yOffset: 6, spring: false };
    case "heavy":
      return { enabled: true, duration: 0.7, stagger: 0.12, yOffset: 24, spring: true };
    case "parallax":
      return { enabled: true, duration: 0.8, stagger: 0.15, yOffset: 40, spring: false };
    case "static":
    default:
      return { enabled: false, duration: 0, stagger: 0, yOffset: 0, spring: false };
  }
}

interface TypoStyle {
  displayWeight: number;
  displayCase: "normal" | "uppercase" | "lowercase";
  displayTracking: string;
  displayItalic: boolean;
  eyebrowCase: "uppercase" | "normal";
  headlineStyle?: React.CSSProperties;
}

function getTypoStyle(vibe?: TypographyVibeId): TypoStyle {
  switch (vibe) {
    case "serif-elegant":
      return {
        displayWeight: 600,
        displayCase: "normal",
        displayTracking: "tracking-tight",
        displayItalic: true,
        eyebrowCase: "uppercase",
        headlineStyle: { fontStyle: "italic" },
      };
    case "sans-modern":
      return {
        displayWeight: 700,
        displayCase: "normal",
        displayTracking: "tracking-tight",
        displayItalic: false,
        eyebrowCase: "uppercase",
      };
    case "display-playful":
      return {
        displayWeight: 900,
        displayCase: "normal",
        displayTracking: "tracking-tighter",
        displayItalic: false,
        eyebrowCase: "normal",
      };
    case "mono-technical":
      return {
        displayWeight: 600,
        displayCase: "lowercase",
        displayTracking: "tracking-normal",
        displayItalic: false,
        eyebrowCase: "uppercase",
      };
    case "hand-script":
      return {
        displayWeight: 500,
        displayCase: "normal",
        displayTracking: "tracking-normal",
        displayItalic: false,
        eyebrowCase: "normal",
      };
    case "mixed":
      return {
        displayWeight: 800,
        displayCase: "normal",
        displayTracking: "tracking-tight",
        displayItalic: false,
        eyebrowCase: "uppercase",
      };
    default:
      return {
        displayWeight: 700,
        displayCase: "normal",
        displayTracking: "tracking-tight",
        displayItalic: false,
        eyebrowCase: "uppercase",
      };
  }
}

function getColorMoodOverlay(mood?: ColorMoodId, primary?: string, accent?: string, secondary?: string) {
  if (!mood || !primary || !accent || !secondary) return undefined;
  switch (mood) {
    case "vibrant":
      return `radial-gradient(circle at 20% 0%, ${accent}40 0%, transparent 50%), radial-gradient(circle at 80% 20%, ${primary}40 0%, transparent 50%)`;
    case "pastel":
      return `linear-gradient(180deg, ${accent}15 0%, transparent 40%)`;
    case "high-contrast":
      return `linear-gradient(180deg, transparent 0%, transparent 80%, ${primary}20 100%)`;
    case "earthy":
      return `radial-gradient(circle at 50% 0%, ${accent}25 0%, transparent 60%)`;
    case "warm":
      return `linear-gradient(180deg, ${accent}20 0%, transparent 50%)`;
    case "cool":
      return `linear-gradient(180deg, ${secondary}20 0%, transparent 50%)`;
    case "neutral":
    default:
      return undefined;
  }
}

interface MoodCopy {
  eyebrow: string;
  headlineLine1: string;
  headlineLine2: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  signUp: string;
  features: { title: string; body: string }[];
  showExtraDetail: boolean;
  showFourthCard: boolean;
  fourthCard?: { title: string; body: string };
  baseFontPx: number;
  footerExtra?: string;
}

function getMoodCopy(mood?: MoodAnswers): MoodCopy {
  const audience = mood?.audience;
  const brand = mood?.brandVibe;
  const detail = mood?.detailLevel ?? "balanced";

  const eyebrow =
    brand === "luxury"
      ? "Limited release"
      : brand === "tech"
        ? "v2.0 · Now in beta"
        : brand === "playful"
          ? "New · Just shipped 🎉"
          : brand === "serious"
            ? "Q2 2026 release"
            : brand === "friendly"
              ? "Hello, world 👋"
              : "New · Just shipped";

  let headlineLine1 = "สร้างเว็บไซต์สวยๆ";
  let headlineLine2 = "ให้แบรนด์ของคุณ";
  let subhead =
    "Beautiful, fast, accessible. ระบบช่วยทีมออกแบบ + dev สร้างเว็บที่ตอบโจทย์แบรนด์ในเวลาไม่กี่นาที.";
  let ctaPrimary = "เริ่มต้นฟรี →";
  let ctaSecondary = "ดูเดโม";
  let signUp = "Sign up";

  if (audience === "kids") {
    headlineLine1 = "สนุกกับการสร้างเว็บ";
    headlineLine2 = "สีสันสดใส!";
    subhead = "เรียนรู้แบบง่ายๆ สนุก เล่นไปด้วย สร้างเว็บของตัวเองได้เลย!";
    ctaPrimary = "เล่นเลย!";
    ctaSecondary = "ดูตัวอย่าง";
  } else if (audience === "youth") {
    headlineLine1 = "เว็บที่ใช่";
    headlineLine2 = "สำหรับเจน Z";
    subhead = "ดีไซน์โดนใจ ลื่นปรื๊ดดด ใช้ฟรี สร้างได้ทันที.";
    ctaPrimary = "Start now";
    ctaSecondary = "Watch demo";
  } else if (audience === "professional") {
    headlineLine1 = "Enterprise-grade";
    headlineLine2 = "design systems";
    subhead =
      "ระบบดีไซน์ระดับองค์กร รองรับทีมขนาดใหญ่ scalable secure พร้อม SLA และ SOC 2 compliance.";
    ctaPrimary = "Request a demo";
    ctaSecondary = "Contact sales";
    signUp = "Book a call";
  } else if (audience === "senior") {
    headlineLine1 = "เครื่องมือใช้งานง่าย";
    headlineLine2 = "สำหรับทุกคน";
    subhead = "ตัวอักษรอ่านง่าย ปุ่มชัดเจน ไม่ซับซ้อน เริ่มต้นได้ภายในไม่กี่นาที.";
    ctaPrimary = "เริ่มใช้งาน";
    ctaSecondary = "ดูคู่มือ";
  }

  if (brand === "luxury") {
    subhead = "Crafted with precision. งานฝีมือสำหรับแบรนด์ที่ใส่ใจรายละเอียดทุกพิกเซล.";
    ctaPrimary = "Discover";
    ctaSecondary = "Our story";
  } else if (brand === "playful") {
    subhead = subhead.replace(".", " 🚀");
    ctaPrimary = ctaPrimary.replace(/[→!]/g, "") + " 🎈";
  } else if (brand === "tech") {
    subhead = "$ npm install acme · Type-safe, edge-native, zero-config. Built for builders.";
    ctaPrimary = "Get started";
    ctaSecondary = "Read docs";
  } else if (brand === "serious") {
    ctaPrimary = "Learn more";
    ctaSecondary = "View case study";
  }

  const baseFeatures: { title: string; body: string }[] = [
    { title: "Fast", body: "Sub-second loads. Edge-rendered." },
    { title: "Beautiful", body: "Crafted typography & color." },
    { title: "Accessible", body: "WCAG AA out of the box." },
  ];

  if (brand === "tech") {
    baseFeatures[0] = { title: "Type-safe", body: "End-to-end TypeScript inference." };
    baseFeatures[1] = { title: "Edge-native", body: "Global CDN, sub-50ms TTFB." };
    baseFeatures[2] = { title: "Open source", body: "MIT licensed · 24k★ on GitHub." };
  } else if (brand === "luxury") {
    baseFeatures[0] = { title: "Refined", body: "Bespoke design tokens." };
    baseFeatures[1] = { title: "Exclusive", body: "By invitation only." };
    baseFeatures[2] = { title: "Premium", body: "White-glove onboarding." };
  } else if (brand === "playful") {
    baseFeatures[0] = { title: "Fun ⚡", body: "Confetti included." };
    baseFeatures[1] = { title: "Easy 🎨", body: "Drag, drop, done!" };
    baseFeatures[2] = { title: "Free 🎁", body: "Forever, no strings." };
  } else if (audience === "professional") {
    baseFeatures[0] = { title: "Compliant", body: "SOC 2 · GDPR · HIPAA-ready." };
    baseFeatures[1] = { title: "Scalable", body: "99.99% uptime SLA." };
    baseFeatures[2] = { title: "Supported", body: "24/7 enterprise support." };
  }

  const showFourthCard = detail === "detailed";
  const fourthCard =
    brand === "tech"
      ? { title: "Observable", body: "OpenTelemetry built-in." }
      : brand === "luxury"
        ? { title: "Personal", body: "Dedicated success manager." }
        : { title: "Reliable", body: "Battle-tested at scale." };

  const baseFontPx = audience === "senior" ? 18 : audience === "kids" ? 16 : 15;

  return {
    eyebrow,
    headlineLine1,
    headlineLine2,
    subhead,
    ctaPrimary,
    ctaSecondary,
    signUp,
    features: baseFeatures,
    showExtraDetail: detail !== "minimal",
    showFourthCard,
    fourthCard,
    baseFontPx,
    footerExtra:
      detail === "detailed"
        ? brand === "tech"
          ? "Status · Changelog · API"
          : "Privacy · Terms · Cookies"
        : undefined,
  };
}

export function WebsitePreview({ answers }: WebsitePreviewProps) {
  const palette = answers.palette;
  const fonts = answers.fonts;
  const sc = getStyleClasses(answers.visualStyle);
  const lc = getLayoutConfig(answers.layout);
  const mc = getMotionConfig(answers.motion);
  const ts = getTypoStyle(answers.typoVibe);
  const copy = getMoodCopy(answers.mood);

  const fontUrl = useMemo(() => {
    if (!fonts) return null;
    return googleFontsUrl([
      { family: fonts.display.family, weights: fonts.display.weights },
      { family: fonts.body.family, weights: fonts.body.weights },
    ]);
  }, [fonts]);

  useEffect(() => {
    if (fontUrl) injectFontLink(fontUrl);
  }, [fontUrl]);

  const bg = palette?.background ?? "#ffffff";
  const fg = palette?.foreground ?? "#0a0a0a";
  const primary = palette?.primary ?? "#3b82f6";
  const secondary = palette?.secondary ?? "#60a5fa";
  const accent = palette?.accent ?? "#f59e0b";
  const muted = palette?.muted ?? "#f5f5f5";
  const border = palette?.border ?? "#e5e5e5";

  const displayFont = fonts ? `"${fonts.display.family}", system-ui, sans-serif` : "system-ui, sans-serif";
  const bodyFont = fonts ? `"${fonts.body.family}", system-ui, sans-serif` : "system-ui, sans-serif";

  const isGlass = answers.visualStyle === "glassmorphism";
  const isBrutal = answers.visualStyle === "brutalism";

  const moodOverlay = getColorMoodOverlay(answers.colorMood, primary, accent, secondary);
  const backgroundImage = isGlass
    ? `linear-gradient(135deg, ${primary}33 0%, ${accent}33 50%, ${secondary}33 100%)`
    : moodOverlay;

  const transition = mc.enabled
    ? mc.spring
      ? { type: "spring" as const, stiffness: 200, damping: 18 }
      : { duration: mc.duration, ease: "easeOut" as const }
    : { duration: 0 };

  const fadeUp = (i = 0) =>
    mc.enabled
      ? {
          initial: { opacity: 0, y: mc.yOffset },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.2 },
          transition: { ...transition, delay: i * mc.stagger },
        }
      : {};

  const displayStyle = {
    fontFamily: displayFont,
    fontWeight: ts.displayWeight,
    fontStyle: ts.displayItalic ? "italic" : undefined,
  };

  const cards = copy.showFourthCard && copy.fourthCard ? [...copy.features, copy.fourthCard] : copy.features;
  const cardColors = [primary, secondary, accent, primary];

  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: bg,
        color: fg,
        fontFamily: bodyFont,
        fontSize: copy.baseFontPx,
        backgroundImage,
      }}
    >
      <header
        className={`flex items-center justify-between ${lc.headerPx} ${lc.headerPy} ${isBrutal ? "border-b-[3px] border-black" : ""}`}
        style={{
          borderColor: !isBrutal ? border : undefined,
          borderBottomWidth: !isBrutal ? 1 : undefined,
          borderBottomStyle: !isBrutal ? "solid" : undefined,
        }}
      >
        <div className={`text-lg ${ts.displayTracking}`} style={{ ...displayStyle, color: primary }}>
          Acme
        </div>
        <nav className="flex gap-1 text-sm" style={{ color: fg }}>
          <a className={sc.navItem}>Home</a>
          <a className={sc.navItem}>Features</a>
          <a className={sc.navItem}>Pricing</a>
          <a className={sc.navItem}>About</a>
        </nav>
        <button
          className={`px-4 py-2 text-sm font-semibold ${sc.button} ${sc.radius}`}
          style={{
            backgroundColor: primary,
            color: bg,
            fontFamily: displayFont,
          }}
        >
          {copy.signUp}
        </button>
      </header>

      <section className={`${lc.heroPx} ${lc.heroPy} ${lc.heroAlign}`}>
        <motion.div
          className={`mb-2 text-xs font-semibold ${ts.eyebrowCase === "uppercase" ? "uppercase tracking-widest" : "tracking-wide"}`}
          style={{ color: accent }}
          {...fadeUp(0)}
        >
          {copy.eyebrow}
        </motion.div>
        <motion.h1
          className={`${lc.heroAlign === "text-center" ? "mx-auto" : ""} ${lc.heroMaxW} ${lc.heroFontSize} ${lc.heroLeading} ${ts.displayTracking}`}
          style={{
            ...displayStyle,
            color: fg,
            textTransform: ts.displayCase === "uppercase" ? "uppercase" : ts.displayCase === "lowercase" ? "lowercase" : undefined,
          }}
          {...fadeUp(1)}
        >
          {copy.headlineLine1} <br />
          {copy.headlineLine2}
        </motion.h1>
        <motion.p
          className={`${lc.heroAlign === "text-center" ? "mx-auto" : ""} mt-3 ${lc.heroSubMaxW} text-sm opacity-80 ${lc.bodyColumns}`}
          style={{ fontFamily: bodyFont, color: fg }}
          {...fadeUp(2)}
        >
          {copy.subhead}
          {lc.bodyColumns && copy.showExtraDetail
            ? " เครื่องมือนี้ช่วยรวม design tokens กับ component library เข้าด้วยกัน ให้คุณส่งมอบงานเร็วขึ้นโดยไม่ลดทอนคุณภาพดีไซน์."
            : ""}
        </motion.p>
        <motion.div className={`mt-5 flex items-center ${lc.ctaJustify} gap-3`} {...fadeUp(3)}>
          <button
            className={`px-5 py-2.5 text-sm font-semibold ${sc.button} ${sc.radius}`}
            style={{
              backgroundColor: primary,
              color: bg,
              fontFamily: displayFont,
            }}
          >
            {copy.ctaPrimary}
          </button>
          <button
            className={`px-5 py-2.5 text-sm font-medium ${sc.radius}`}
            style={{
              backgroundColor: "transparent",
              color: fg,
              border: `1px solid ${border}`,
              fontFamily: displayFont,
            }}
          >
            {copy.ctaSecondary}
          </button>
        </motion.div>
      </section>

      <section className={`grid grid-cols-1 ${lc.featuresGap} ${lc.featuresPx} ${lc.featuresPb} ${lc.featuresGridCols}`}>
        {cards.map((f, idx) => (
          <motion.div
            key={f.title}
            className={`${lc.cardPadding} ${sc.card} ${sc.radius}`}
            style={{
              backgroundColor: isGlass ? undefined : muted,
              borderColor: border,
            }}
            {...fadeUp(4 + idx)}
          >
            <div
              className="mb-1 h-1 w-6 rounded-full"
              style={{ backgroundColor: cardColors[idx] ?? primary }}
            />
            <div
              className={`${lc.cardTitleSize} font-semibold`}
              style={{ ...displayStyle, color: fg }}
            >
              {f.title}
            </div>
            <div className={`mt-1 ${lc.cardBodySize} opacity-70`} style={{ fontFamily: bodyFont, color: fg }}>
              {f.body}
            </div>
            {copy.showExtraDetail && (
              <div className={`mt-2 ${lc.cardBodySize} opacity-50`} style={{ fontFamily: bodyFont, color: fg }}>
                Learn more →
              </div>
            )}
          </motion.div>
        ))}
      </section>

      <footer
        className={`flex items-center justify-between ${lc.footerPx} ${lc.footerPy} text-xs`}
        style={{
          borderTop: `1px solid ${border}`,
          color: fg,
          opacity: 0.7,
        }}
      >
        <span style={{ fontFamily: bodyFont }}>© 2026 Acme</span>
        {copy.footerExtra && (
          <span style={{ fontFamily: bodyFont }}>{copy.footerExtra}</span>
        )}
        <span style={{ fontFamily: bodyFont }}>Built with ❤</span>
      </footer>
    </div>
  );
}
