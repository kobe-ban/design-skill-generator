"use client";

import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  googleFontsCatalog,
  googleFontsUrl,
  scaleRatios,
  type GoogleFontEntry,
} from "@/lib/google-fonts";
import type { FontChoice, ScaleRatio } from "@/types";

interface PickerValue {
  display: FontChoice;
  body: FontChoice;
  scale: ScaleRatio;
}

interface GoogleFontsPickerProps {
  value?: PickerValue;
  onChange: (v: PickerValue) => void;
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

function toFontChoice(entry: GoogleFontEntry): FontChoice {
  return {
    family: entry.family,
    weights: entry.weights,
    category: entry.category,
    thaiSupport: entry.thaiSupport,
  };
}

export function GoogleFontsPicker({ value, onChange }: GoogleFontsPickerProps) {
  const [activeSlot, setActiveSlot] = useState<"display" | "body">("display");
  const [search, setSearch] = useState("");
  const [thaiOnly, setThaiOnly] = useState(false);
  const [category, setCategory] = useState<string>("all");

  const filtered = useMemo(() => {
    return googleFontsCatalog.filter((f) => {
      if (thaiOnly && !f.thaiSupport) return false;
      if (category !== "all" && f.category !== category) return false;
      if (search && !f.family.toLowerCase().includes(search.toLowerCase())) return false;
      return true;
    });
  }, [search, thaiOnly, category]);

  useEffect(() => {
    if (filtered.length === 0) return;
    const url = googleFontsUrl(
      filtered.slice(0, 20).map((f) => ({ family: f.family, weights: [400, 600] })),
    );
    injectFontLink(url);
  }, [filtered]);

  useEffect(() => {
    if (!value) return;
    const url = googleFontsUrl([
      { family: value.display.family, weights: value.display.weights },
      { family: value.body.family, weights: value.body.weights },
    ]);
    injectFontLink(url);
  }, [value]);

  const select = (font: GoogleFontEntry) => {
    const choice = toFontChoice(font);
    if (!value) {
      onChange({
        display: choice,
        body: choice,
        scale: 1.25 as ScaleRatio,
      });
      return;
    }
    onChange({ ...value, [activeSlot]: choice });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-3">
        <div className="flex gap-2 rounded-lg bg-neutral-100 p-1 dark:bg-neutral-900">
          {(["display", "body"] as const).map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setActiveSlot(slot)}
              className={cn(
                "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                activeSlot === slot
                  ? "bg-white shadow dark:bg-neutral-700"
                  : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-400",
              )}
            >
              {slot === "display" ? "Display (heading)" : "Body (paragraph)"}
              {value && (
                <div className="text-xs font-normal opacity-70">{value[slot].family}</div>
              )}
            </button>
          ))}
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="ค้นหาฟอนต์..."
            className="w-full rounded-lg border border-neutral-300 bg-white py-2 pl-9 pr-3 text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <label className="flex items-center gap-2 text-xs">
            <input
              type="checkbox"
              checked={thaiOnly}
              onChange={(e) => setThaiOnly(e.target.checked)}
            />
            รองรับภาษาไทย
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-md border border-neutral-300 bg-white px-2 py-1 text-xs dark:border-neutral-700 dark:bg-neutral-900"
          >
            <option value="all">ทุกประเภท</option>
            <option value="serif">Serif</option>
            <option value="sans-serif">Sans</option>
            <option value="display">Display</option>
            <option value="monospace">Mono</option>
            <option value="handwriting">Hand</option>
          </select>
        </div>

        <div className="max-h-[400px] overflow-y-auto rounded-lg border border-neutral-200 dark:border-neutral-800">
          {filtered.length === 0 ? (
            <div className="p-4 text-sm text-neutral-500">ไม่พบ font ที่ตรงเงื่อนไข</div>
          ) : (
            filtered.map((f) => {
              const isSelected = value && value[activeSlot].family === f.family;
              return (
                <button
                  key={f.family}
                  type="button"
                  onClick={() => select(f)}
                  className={cn(
                    "flex w-full items-center justify-between border-b border-neutral-100 px-4 py-3 text-left transition-colors last:border-b-0 dark:border-neutral-800",
                    isSelected
                      ? "bg-blue-50 dark:bg-blue-950/30"
                      : "hover:bg-neutral-50 dark:hover:bg-neutral-900",
                  )}
                >
                  <div>
                    <div
                      className="text-base"
                      style={{ fontFamily: `"${f.family}", system-ui` }}
                    >
                      {f.family} <span className="text-neutral-500">— Aa Bb 123</span>
                    </div>
                    <div className="text-xs text-neutral-500">
                      {f.category} · {f.weights.length} weights
                      {f.thaiSupport && " · TH"}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div>
          <div className="mb-2 text-sm font-medium">Type Scale</div>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {scaleRatios.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() =>
                  value &&
                  onChange({ ...value, scale: r.value as ScaleRatio })
                }
                className={cn(
                  "rounded-lg border-2 px-3 py-2 text-left text-xs transition-colors",
                  value?.scale === r.value
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
                    : "border-neutral-200 dark:border-neutral-800",
                )}
              >
                <div className="font-mono text-sm">{r.value}</div>
                <div className="text-neutral-600 dark:text-neutral-400">{r.name}</div>
              </button>
            ))}
          </div>
        </div>

        {value && (
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="mb-3 text-xs uppercase tracking-wider text-neutral-500">Preview</div>
            <div
              className="text-4xl font-semibold leading-tight"
              style={{ fontFamily: `"${value.display.family}", system-ui` }}
            >
              The quick brown fox
            </div>
            <div
              className="mt-1 text-2xl font-medium"
              style={{ fontFamily: `"${value.display.family}", system-ui` }}
            >
              ทดสอบภาษาไทย ก ข ค ง
            </div>
            <div
              className="mt-3 text-base leading-relaxed text-neutral-700 dark:text-neutral-300"
              style={{ fontFamily: `"${value.body.family}", system-ui` }}
            >
              Body text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ตัวอย่างเนื้อหาภาษาไทย
              เพื่อทดสอบความสวยงามของฟอนต์ที่เลือก.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
