"use client";

import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import { generatePaletteFromHex } from "@/lib/color-utils";
import type { Palette } from "@/types";
import { PaletteCard } from "./palette-card";

interface ColorPickerProps {
  onPaletteGenerated: (palette: Palette) => void;
  selectedPaletteId?: string;
}

export function ColorPicker({ onPaletteGenerated, selectedPaletteId }: ColorPickerProps) {
  const [hex, setHex] = useState("#3B82F6");
  const palette = generatePaletteFromHex(hex);

  const handleApply = () => {
    onPaletteGenerated({ ...palette, id: `custom-${hex}`, name: `Custom ${hex}` });
  };

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <div className="flex flex-col gap-4">
        <HexColorPicker
          color={hex}
          onChange={setHex}
          style={{ width: "100%", height: 240 }}
        />
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            className="flex-1 rounded-lg border border-neutral-300 bg-white px-3 py-2 font-mono text-sm dark:border-neutral-700 dark:bg-neutral-900"
          />
          <button
            type="button"
            onClick={handleApply}
            className="rounded-lg bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
          >
            Apply
          </button>
        </div>
        <p className="text-xs text-neutral-500">
          เลือกสี primary แล้วระบบจะสร้าง palette ครบชุดให้อัตโนมัติ (HSL harmony)
        </p>
      </div>
      <div>
        <div className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Generated palette
        </div>
        <PaletteCard
          palette={{ ...palette, id: `custom-${hex}`, name: `Custom ${hex}` }}
          selected={selectedPaletteId === `custom-${hex}`}
          onClick={handleApply}
        />
      </div>
    </div>
  );
}
