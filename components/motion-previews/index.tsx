"use client";

import { motion } from "framer-motion";
import type { MotionLevelId } from "@/types";

function StaticDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
      <div className="rounded-lg bg-neutral-300 dark:bg-neutral-700 px-4 py-2 text-sm">Static</div>
    </div>
  );
}

function SubtleDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="rounded-lg bg-blue-500 px-4 py-2 text-sm text-white"
      >
        Hover me
      </motion.div>
    </div>
  );
}

function HeavyDemo() {
  return (
    <div className="flex h-full w-full items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-900">
      <motion.div
        className="rounded-lg bg-pink-500 px-4 py-2 text-sm text-white"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Bouncy
      </motion.div>
    </div>
  );
}

function ParallaxDemo() {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl bg-gradient-to-b from-sky-300 to-indigo-500">
      <motion.div
        className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center justify-center"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="rounded-lg bg-white/80 px-4 py-2 text-sm text-indigo-900">Parallax</div>
      </motion.div>
      <motion.div
        className="absolute bottom-1 left-2 right-2 h-1 rounded-full bg-white/40"
        animate={{ x: ["-20%", "20%", "-20%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

const previews: Record<MotionLevelId, React.ComponentType> = {
  static: StaticDemo,
  subtle: SubtleDemo,
  heavy: HeavyDemo,
  parallax: ParallaxDemo,
};

export function MotionPreview({ id }: { id: MotionLevelId }) {
  const Preview = previews[id];
  return <Preview />;
}
