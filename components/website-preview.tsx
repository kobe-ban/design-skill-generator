"use client";

import { useEffect, useMemo } from "react";
import type { QuizAnswers, VisualStyleId } from "@/types";
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

export function WebsitePreview({ answers }: WebsitePreviewProps) {
  const palette = answers.palette;
  const fonts = answers.fonts;
  const sc = getStyleClasses(answers.visualStyle);

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

  return (
    <div
      className="relative overflow-hidden"
      style={{
        backgroundColor: bg,
        color: fg,
        fontFamily: bodyFont,
        backgroundImage: isGlass
          ? `linear-gradient(135deg, ${primary}33 0%, ${accent}33 50%, ${secondary}33 100%)`
          : undefined,
      }}
    >
      <header
        className={`flex items-center justify-between px-6 py-4 ${isBrutal ? "border-b-[3px] border-black" : ""}`}
        style={{
          borderColor: !isBrutal ? border : undefined,
          borderBottomWidth: !isBrutal ? 1 : undefined,
          borderBottomStyle: !isBrutal ? "solid" : undefined,
        }}
      >
        <div className="text-lg font-bold" style={{ fontFamily: displayFont, color: primary }}>
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
          Sign up
        </button>
      </header>

      <section className="px-6 py-10 text-center">
        <div
          className="mb-2 text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent }}
        >
          New · Just shipped
        </div>
        <h1
          className="mx-auto max-w-2xl text-4xl font-bold leading-tight md:text-5xl"
          style={{ fontFamily: displayFont, color: fg }}
        >
          สร้างเว็บไซต์สวยๆ <br />
          ให้แบรนด์ของคุณ
        </h1>
        <p
          className="mx-auto mt-3 max-w-md text-sm opacity-80"
          style={{ fontFamily: bodyFont, color: fg }}
        >
          Beautiful, fast, accessible. ระบบช่วยทีมออกแบบ + dev สร้างเว็บที่ตอบโจทย์แบรนด์ในเวลาไม่กี่นาที.
        </p>
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            className={`px-5 py-2.5 text-sm font-semibold ${sc.button} ${sc.radius}`}
            style={{
              backgroundColor: primary,
              color: bg,
              fontFamily: displayFont,
            }}
          >
            เริ่มต้นฟรี →
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
            ดูเดโม
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-3 px-6 pb-8 sm:grid-cols-3">
        {[
          { title: "Fast", body: "Sub-second loads. Edge-rendered.", color: primary },
          { title: "Beautiful", body: "Crafted typography & color.", color: secondary },
          { title: "Accessible", body: "WCAG AA out of the box.", color: accent },
        ].map((f) => (
          <div
            key={f.title}
            className={`p-4 ${sc.card} ${sc.radius}`}
            style={{
              backgroundColor: isGlass ? undefined : muted,
              borderColor: border,
            }}
          >
            <div
              className="mb-1 h-1 w-6 rounded-full"
              style={{ backgroundColor: f.color }}
            />
            <div
              className="text-base font-semibold"
              style={{ fontFamily: displayFont, color: fg }}
            >
              {f.title}
            </div>
            <div className="mt-1 text-xs opacity-70" style={{ fontFamily: bodyFont, color: fg }}>
              {f.body}
            </div>
          </div>
        ))}
      </section>

      <footer
        className="flex items-center justify-between px-6 py-3 text-xs"
        style={{
          borderTop: `1px solid ${border}`,
          color: fg,
          opacity: 0.7,
        }}
      >
        <span style={{ fontFamily: bodyFont }}>© 2026 Acme</span>
        <span style={{ fontFamily: bodyFont }}>Built with ❤</span>
      </footer>
    </div>
  );
}
