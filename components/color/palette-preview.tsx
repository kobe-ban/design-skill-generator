"use client";

import type { Palette } from "@/types";
import { paletteContrastReport } from "@/lib/color-utils";
import { ContrastBadge } from "./contrast-badge";

interface PalettePreviewProps {
  palette: Palette;
}

export function PalettePreview({ palette }: PalettePreviewProps) {
  const contrast = paletteContrastReport(palette);

  return (
    <div
      className="rounded-2xl border p-6"
      style={{
        backgroundColor: palette.background,
        borderColor: palette.border,
        color: palette.foreground,
      }}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Live preview</h3>
          <p className="text-sm opacity-70">ตัวอย่าง UI ใช้ palette ที่เลือก</p>
        </div>
        <button
          type="button"
          className="rounded-lg px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: palette.primary, color: palette.background }}
        >
          Primary CTA
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: palette.muted, color: palette.foreground }}
        >
          <div className="mb-1 text-xs opacity-60">Card</div>
          <div className="text-sm font-medium">Muted surface</div>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: palette.secondary, color: palette.background }}
        >
          <div className="mb-1 text-xs opacity-80">Card</div>
          <div className="text-sm font-medium">Secondary</div>
        </div>
        <div
          className="rounded-xl p-4"
          style={{ backgroundColor: palette.accent, color: palette.background }}
        >
          <div className="mb-1 text-xs opacity-80">Card</div>
          <div className="text-sm font-medium">Accent</div>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <ContrastBadge fg={palette.foreground} bg={palette.background} label="text/bg" />
        <ContrastBadge fg={palette.background} bg={palette.primary} label="bg/primary" />
        <ContrastBadge fg={palette.background} bg={palette.accent} label="bg/accent" />
      </div>
      <div className="mt-3 text-xs opacity-60">
        WCAG AA = 4.5+, AAA = 7+ (text), AA Large = 3+ (large text/UI)
      </div>
    </div>
  );
}
