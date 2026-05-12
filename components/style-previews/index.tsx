"use client";

import type { VisualStyleId } from "@/types";

function MiniNav({ items }: { items: React.ReactNode[] }) {
  return (
    <div className="flex items-center justify-between text-[7px]">
      {items}
    </div>
  );
}

function GlassmorphismPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-gradient-to-br from-purple-400 via-pink-400 to-orange-300">
      <div className="absolute left-1.5 right-1.5 top-1.5 rounded-lg border border-white/40 bg-white/30 px-2 py-1.5 backdrop-blur-md">
        <MiniNav
          items={[
            <div key="l" className="text-[7px] font-bold text-white">Brand</div>,
            <div key="r" className="flex gap-1">
              <div className="h-1 w-3 rounded-full bg-white/70" />
              <div className="h-1 w-3 rounded-full bg-white/50" />
            </div>,
          ]}
        />
      </div>
      <div className="absolute inset-x-2 bottom-2 rounded-lg border border-white/40 bg-white/30 p-2 backdrop-blur-xl">
        <div className="mb-1 h-1.5 w-3/4 rounded bg-white/80" />
        <div className="mb-2 h-1 w-1/2 rounded bg-white/50" />
        <div className="h-3 w-12 rounded-full border border-white/40 bg-white/30 backdrop-blur" />
      </div>
    </div>
  );
}

function SkeuomorphismPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-gradient-to-b from-amber-100 to-amber-200 p-1.5">
      <div className="rounded-md border border-amber-700/30 bg-gradient-to-b from-amber-50 to-amber-200 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
        <MiniNav
          items={[
            <div key="l" className="text-[7px] font-bold text-amber-900">App</div>,
            <div key="r" className="h-2 w-2 rounded-full bg-amber-300 shadow-inner" />,
          ]}
        />
      </div>
      <div className="mt-1.5 space-y-1">
        <div className="h-1 w-3/4 rounded bg-amber-900/70" />
        <div className="h-1 w-1/2 rounded bg-amber-700/40" />
      </div>
      <div className="absolute bottom-1.5 left-1.5">
        <div className="rounded-md border border-amber-700/40 bg-gradient-to-b from-amber-50 to-amber-300 px-2 py-1 text-[7px] font-bold text-amber-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(120,53,15,0.3)]">
          Submit
        </div>
      </div>
    </div>
  );
}

function NeumorphismPreview() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-md bg-neutral-200 p-2">
      <div className="rounded-md bg-neutral-200 p-1 shadow-[inset_2px_2px_4px_#bababa,inset_-2px_-2px_4px_#ffffff]">
        <MiniNav
          items={[
            <div key="l" className="text-[7px] font-bold text-neutral-700">App</div>,
            <div key="r" className="h-2 w-2 rounded-full bg-neutral-200 shadow-[1px_1px_2px_#bababa,-1px_-1px_2px_#ffffff]" />,
          ]}
        />
      </div>
      <div className="mt-2 space-y-1">
        <div className="h-1.5 w-3/4 rounded bg-neutral-400" />
        <div className="h-1 w-1/2 rounded bg-neutral-300" />
      </div>
      <div className="absolute bottom-1.5 right-1.5">
        <div className="rounded-md bg-neutral-200 px-2 py-1 text-[7px] font-bold text-neutral-700 shadow-[3px_3px_6px_#bababa,-3px_-3px_6px_#ffffff]">
          Go
        </div>
      </div>
    </div>
  );
}

function FlatPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between bg-blue-500 px-2 py-1">
        <span className="text-[7px] font-bold text-white">FLAT</span>
        <div className="flex gap-1">
          <div className="h-0.5 w-3 bg-white/80" />
          <div className="h-0.5 w-3 bg-white/60" />
        </div>
      </div>
      <div className="flex-1 space-y-1 p-2">
        <div className="h-2 w-3/4 bg-blue-500" />
        <div className="h-1 w-1/2 bg-blue-300" />
        <div className="h-1 w-2/3 bg-neutral-300" />
      </div>
      <div className="flex gap-1 p-2">
        <div className="bg-red-500 px-2 py-0.5 text-[7px] font-bold text-white">CTA</div>
        <div className="bg-yellow-400 px-2 py-0.5 text-[7px] font-bold text-neutral-900">More</div>
      </div>
    </div>
  );
}

function MaterialPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-slate-50">
      <div className="flex items-center justify-between bg-indigo-600 px-2 py-1.5 shadow-md">
        <span className="text-[7px] font-bold uppercase tracking-wider text-white">Menu</span>
        <div className="h-2 w-2 rounded-full bg-white/80" />
      </div>
      <div className="flex-1 p-1.5">
        <div className="rounded-sm bg-white p-1.5 shadow-md">
          <div className="mb-1 h-1.5 w-3/4 rounded-sm bg-slate-300" />
          <div className="h-1 w-1/2 rounded-sm bg-slate-200" />
        </div>
      </div>
      <div className="flex justify-end p-2">
        <div className="rounded-sm bg-indigo-600 px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-white shadow-md">
          Action
        </div>
      </div>
    </div>
  );
}

function BrutalismPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-yellow-300 p-1">
      <div className="border-b-2 border-black bg-yellow-300 px-1 py-1">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[8px] font-black uppercase text-black">Site!</span>
          <div className="border border-black bg-white px-1 text-[7px] font-mono font-bold">×</div>
        </div>
      </div>
      <div className="flex-1 px-1 py-1 font-mono">
        <div className="text-[10px] font-black uppercase leading-none text-black">BIG.</div>
        <div className="text-[7px] font-bold text-black">click here→</div>
      </div>
      <div className="self-start">
        <div className="border-2 border-black bg-pink-300 px-2 py-0.5 font-mono text-[7px] font-bold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          Buy
        </div>
      </div>
    </div>
  );
}

function MinimalismPreview() {
  return (
    <div className="flex h-full w-full flex-col bg-white">
      <div className="flex items-center justify-between border-b border-neutral-200 px-2 py-1.5">
        <span className="text-[7px] font-light tracking-widest text-neutral-900">brand</span>
        <span className="text-[6px] tracking-wider text-neutral-400">menu</span>
      </div>
      <div className="flex flex-1 flex-col justify-center px-3">
        <div className="text-[6px] uppercase tracking-widest text-neutral-400">001</div>
        <div className="mt-1 text-[10px] font-light leading-tight text-neutral-900">Less, but better.</div>
      </div>
      <div className="px-2 py-1.5">
        <span className="border-b border-neutral-900 pb-0.5 text-[7px] text-neutral-900">read more →</span>
      </div>
    </div>
  );
}

const previews: Record<VisualStyleId, React.ComponentType> = {
  glassmorphism: GlassmorphismPreview,
  skeuomorphism: SkeuomorphismPreview,
  neumorphism: NeumorphismPreview,
  flat: FlatPreview,
  material: MaterialPreview,
  brutalism: BrutalismPreview,
  minimalism: MinimalismPreview,
};

export function StylePreview({ id }: { id: VisualStyleId }) {
  const Preview = previews[id];
  return <Preview />;
}
