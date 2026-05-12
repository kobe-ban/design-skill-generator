"use client";

import type { LayoutId } from "@/types";

function Grid12() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-blue-200 bg-blue-50 px-1.5 py-1">
        <div className="text-[7px] font-bold text-blue-900">Logo</div>
        <div className="flex gap-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-1 w-2 rounded-sm bg-blue-300" />
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-12 gap-1 p-1.5">
        <div className="col-span-12 h-3 rounded-sm bg-blue-400" />
        <div className="col-span-4 space-y-0.5 rounded-sm bg-blue-100 p-1">
          <div className="h-1 w-full rounded-sm bg-blue-300" />
          <div className="h-0.5 w-3/4 rounded-sm bg-blue-200" />
        </div>
        <div className="col-span-4 space-y-0.5 rounded-sm bg-blue-100 p-1">
          <div className="h-1 w-full rounded-sm bg-blue-300" />
          <div className="h-0.5 w-3/4 rounded-sm bg-blue-200" />
        </div>
        <div className="col-span-4 space-y-0.5 rounded-sm bg-blue-100 p-1">
          <div className="h-1 w-full rounded-sm bg-blue-300" />
          <div className="h-0.5 w-3/4 rounded-sm bg-blue-200" />
        </div>
      </div>
    </div>
  );
}

function Asymmetric() {
  return (
    <div className="flex h-full w-full bg-white">
      <div className="flex w-1/3 flex-col gap-1 bg-pink-100 p-1.5">
        <div className="text-[7px] font-bold text-pink-900">Brand</div>
        <div className="mt-2 h-2 rounded-sm bg-pink-400" />
        <div className="h-1 w-3/4 rounded-sm bg-pink-300" />
      </div>
      <div className="flex flex-1 flex-col gap-1 p-1.5 pt-3">
        <div className="ml-2 h-3 rounded-sm bg-pink-500" />
        <div className="ml-2 h-1 w-1/2 rounded-sm bg-pink-300" />
        <div className="ml-4 mt-1 h-2 rounded-sm bg-pink-200" />
        <div className="ml-4 h-2 rounded-sm bg-pink-200" />
      </div>
    </div>
  );
}

function WhitespaceHeavy() {
  return (
    <div className="flex h-full w-full flex-col bg-emerald-50/40">
      <div className="flex items-center justify-between px-3 py-2">
        <div className="text-[7px] font-light tracking-wider text-emerald-900">brand</div>
        <div className="text-[6px] text-emerald-600">menu</div>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center gap-1.5 px-4">
        <div className="h-2 w-1/2 rounded-sm bg-emerald-400" />
        <div className="h-1 w-1/3 rounded-sm bg-emerald-200" />
        <div className="mt-1 h-2.5 w-10 rounded-sm bg-emerald-600" />
      </div>
      <div className="h-2" />
    </div>
  );
}

function Compact() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-amber-200 bg-amber-50 px-1.5 py-0.5">
        <div className="text-[6px] font-bold text-amber-900">Dashboard</div>
        <div className="flex gap-0.5">
          <div className="h-1 w-1 rounded-full bg-amber-400" />
          <div className="h-1 w-1 rounded-full bg-amber-400" />
        </div>
      </div>
      <div className="flex-1 space-y-0.5 p-1">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="grid grid-cols-6 gap-0.5">
            <div className="col-span-1 h-1.5 rounded-sm bg-amber-300" />
            <div className="col-span-3 h-1.5 rounded-sm bg-amber-100" />
            <div className="col-span-1 h-1.5 rounded-sm bg-amber-200" />
            <div className="col-span-1 h-1.5 rounded-sm bg-amber-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Magazine() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="border-b-2 border-rose-700 bg-white px-2 py-1">
        <div className="text-[8px] font-black uppercase tracking-tight text-rose-700">
          Editorial
        </div>
      </div>
      <div className="h-3 bg-rose-300" />
      <div className="flex flex-1 gap-1 p-1.5">
        <div className="flex-1 space-y-0.5">
          <div className="h-1 w-full rounded-sm bg-rose-200" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-3/4 rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-3/4 rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
        </div>
        <div className="flex-1 space-y-0.5">
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-3/4 rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
          <div className="h-0.5 w-full rounded-sm bg-rose-100" />
        </div>
      </div>
    </div>
  );
}

const previews: Record<LayoutId, React.ComponentType> = {
  "grid-12": Grid12,
  asymmetric: Asymmetric,
  "whitespace-heavy": WhitespaceHeavy,
  compact: Compact,
  magazine: Magazine,
};

export function LayoutPreview({ id }: { id: LayoutId }) {
  const Preview = previews[id];
  return (
    <div className="h-full w-full overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900">
      <Preview />
    </div>
  );
}
