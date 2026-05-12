import type {
  LayoutId,
  MotionLevelId,
  StyleOption,
  VisualStyleId,
} from "@/types";

export interface VisualStyleData extends StyleOption<VisualStyleId> {
  cssTokens: {
    background: string;
    border: string;
    shadow: string;
    radius: string;
    extras?: string;
  };
  guideline: string;
}

export const visualStyles: VisualStyleData[] = [
  {
    id: "glassmorphism",
    label: "Glassmorphism",
    labelTh: "กระจกฝ้า",
    description: "Frosted glass with blur, translucent surfaces, soft borders.",
    descriptionTh: "พื้นผิวโปร่งแสงเบลอเหมือนกระจกฝ้า ขอบบางเบา",
    cssTokens: {
      background: "bg-white/30 dark:bg-white/10",
      border: "border border-white/40 dark:border-white/20",
      shadow: "shadow-lg shadow-black/5",
      radius: "rounded-2xl",
      extras: "backdrop-blur-xl",
    },
    guideline:
      "ใช้ backdrop-filter: blur(12-20px), bg-white/20-30, border-white/20-40, มี gradient background ด้านหลังเสมอเพื่อเห็น blur effect",
  },
  {
    id: "skeuomorphism",
    label: "Skeuomorphism",
    labelTh: "เลียนแบบของจริง",
    description: "Realistic textures, gradients, deep shadows mimicking physical objects.",
    descriptionTh: "เนื้อสัมผัสเหมือนจริง gradient ลึก เงาแบบวัตถุจริง",
    cssTokens: {
      background:
        "bg-gradient-to-b from-neutral-100 to-neutral-300 dark:from-neutral-700 dark:to-neutral-900",
      border: "border border-neutral-400/50",
      shadow:
        "shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_4px_12px_rgba(0,0,0,0.2)]",
      radius: "rounded-xl",
      extras: "",
    },
    guideline:
      "ใช้ multiple gradients, inset highlight (rgba(255,255,255,0.6)), drop shadow ลึก, รายละเอียดเนื้อสัมผัสคล้ายปุ่ม/วัสดุจริง",
  },
  {
    id: "neumorphism",
    label: "Neumorphism",
    labelTh: "นูนต่ำ",
    description: "Soft UI with extruded surfaces, dual-tone shadows, monochromatic.",
    descriptionTh: "พื้นผิวนูนเข้า-ออกจาก background เงา 2 ทิศ โทนสีเดียว",
    cssTokens: {
      background: "bg-neutral-200 dark:bg-neutral-800",
      border: "",
      shadow:
        "shadow-[8px_8px_16px_rgba(0,0,0,0.15),-8px_-8px_16px_rgba(255,255,255,0.7)] dark:shadow-[8px_8px_16px_rgba(0,0,0,0.5),-8px_-8px_16px_rgba(255,255,255,0.05)]",
      radius: "rounded-2xl",
      extras: "",
    },
    guideline:
      "background กับ surface ต้องสีเดียวกัน, shadow คู่ (ขาวบน/ดำล่าง), หลีกเลี่ยง border ใช้แค่ shadow",
  },
  {
    id: "flat",
    label: "Flat Design",
    labelTh: "แบน",
    description: "Pure colors, no shadows, sharp edges, simple geometry.",
    descriptionTh: "สีล้วน ไม่มีเงา ขอบคม รูปทรงเรียบ",
    cssTokens: {
      background: "bg-blue-500",
      border: "",
      shadow: "",
      radius: "rounded",
      extras: "text-white",
    },
    guideline:
      "ห้ามใช้ shadow/gradient, ใช้สีล้วน, radius เล็กหรือไม่มี, ความคมของขอบสำคัญ",
  },
  {
    id: "material",
    label: "Material Design",
    labelTh: "วัสดุ",
    description: "Google's design system: elevation shadows, ripples, bold colors.",
    descriptionTh: "ระบบดีไซน์ของ Google เงาตามชั้น ripple ปุ่มกด สีจัด",
    cssTokens: {
      background: "bg-indigo-600 dark:bg-indigo-500",
      border: "",
      shadow:
        "shadow-[0_3px_5px_-1px_rgba(0,0,0,0.2),0_6px_10px_0_rgba(0,0,0,0.14),0_1px_18px_0_rgba(0,0,0,0.12)]",
      radius: "rounded",
      extras: "text-white uppercase tracking-wider text-sm font-medium",
    },
    guideline:
      "ใช้ elevation shadow มาตรฐาน Material (dp1-dp24), ปุ่มมี ripple, typography Roboto/Inter, primary/accent ชัดเจน",
  },
  {
    id: "brutalism",
    label: "Brutalism",
    labelTh: "บรูทัล",
    description: "Raw, bold, monospace, harsh borders, unconventional layout.",
    descriptionTh: "ดิบ หนา ตัวอักษร mono เส้นขอบหนาๆ เลย์เอาต์ไม่ตามกรอบ",
    cssTokens: {
      background: "bg-yellow-300",
      border: "border-4 border-black",
      shadow: "shadow-[8px_8px_0_0_rgba(0,0,0,1)]",
      radius: "rounded-none",
      extras: "font-mono text-black",
    },
    guideline:
      "border หนา 3-6px สีดำ, shadow แบบ offset solid (ไม่ blur), สีขัดแย้ง/จัดจ้าน, font monospace, ขอบไม่มน",
  },
  {
    id: "minimalism",
    label: "Minimalism",
    labelTh: "มินิมอล",
    description: "Whitespace, restrained palette, subtle dividers, type-forward.",
    descriptionTh: "พื้นที่ว่างเยอะ จานสีจำกัด เส้นแบ่งบาง เน้นตัวอักษร",
    cssTokens: {
      background: "bg-white dark:bg-neutral-950",
      border: "border-b border-neutral-200 dark:border-neutral-800",
      shadow: "",
      radius: "rounded-none",
      extras: "text-neutral-900 dark:text-neutral-100",
    },
    guideline:
      "whitespace generous, จานสี 2-3 สี, divider บาง 1px, ความเรียบของ typography คือพระเอก",
  },
];

export interface MotionData extends StyleOption<MotionLevelId> {
  duration: number;
  easing: string;
  triggers: string[];
  guideline: string;
}

export const motionLevels: MotionData[] = [
  {
    id: "static",
    label: "Static",
    labelTh: "ไม่มี motion",
    description: "No animation. Pure static UI. Best for content-heavy.",
    descriptionTh: "ไม่มี animation เน้น UI นิ่ง เหมาะ content เยอะ",
    duration: 0,
    easing: "none",
    triggers: [],
    guideline: "หลีกเลี่ยง animation ทุกชนิด ยกเว้น focus/hover แบบ instant",
  },
  {
    id: "subtle",
    label: "Subtle",
    labelTh: "เบาๆ",
    description: "200-300ms eases on hover/state, no scroll effects.",
    descriptionTh: "200-300ms ease ตอน hover/state ไม่มี scroll effect",
    duration: 250,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    triggers: ["hover", "focus", "state-change"],
    guideline:
      "ใช้ transition 200-300ms ease-in-out เฉพาะ hover/state, ไม่ใช้ Framer Motion ก็ได้",
  },
  {
    id: "heavy",
    label: "Heavy",
    labelTh: "เต็มที่",
    description: "Page transitions, micro-interactions everywhere, springy.",
    descriptionTh: "Transition ทั้งหน้า micro-interaction ทุกที่ สปริง",
    duration: 500,
    easing: "spring",
    triggers: ["mount", "hover", "click", "scroll", "page-transition"],
    guideline:
      "ใช้ Framer Motion เต็มที่: layout animations, AnimatePresence, spring transitions, stagger children",
  },
  {
    id: "parallax",
    label: "Scroll & Parallax",
    labelTh: "Scroll & พาราแลกซ์",
    description: "Scroll-triggered reveals, parallax layers, sticky scenes.",
    descriptionTh: "Reveal ตาม scroll พาราแลกซ์เลเยอร์ ฉาก sticky",
    duration: 600,
    easing: "ease-out",
    triggers: ["scroll", "intersection", "viewport"],
    guideline:
      "ใช้ Framer Motion useScroll/useTransform, IntersectionObserver, parallax background ความเร็วต่างกัน",
  },
];

export interface LayoutData extends StyleOption<LayoutId> {
  spacingScale: string;
  guideline: string;
}

export const layouts: LayoutData[] = [
  {
    id: "grid-12",
    label: "12-Column Grid",
    labelTh: "กริด 12 คอลัมน์",
    description: "Classic web grid, predictable, structured.",
    descriptionTh: "กริดเว็บคลาสสิก คาดเดาได้ มีโครงสร้าง",
    spacingScale: "Tailwind default (4px base)",
    guideline:
      "ใช้ container max-w-7xl, grid-cols-12 พร้อม gap-6, breakpoint sm/md/lg/xl ตามมาตรฐาน",
  },
  {
    id: "asymmetric",
    label: "Asymmetric",
    labelTh: "ไม่สมมาตร",
    description: "Off-grid placements, intentional imbalance, editorial feel.",
    descriptionTh: "วางผิดกริด ไม่สมดุลตั้งใจ ฟีลแม็กกาซีน",
    spacingScale: "Custom — varies",
    guideline:
      "ผสม col-span ไม่เท่ากัน, offset ด้วย margin/translate, ตัวอย่าง 7-5 หรือ 8-4 split",
  },
  {
    id: "whitespace-heavy",
    label: "Whitespace-heavy",
    labelTh: "ที่ว่างเยอะ",
    description: "Generous padding, large gaps, breathing room everywhere.",
    descriptionTh: "Padding เยอะ ช่องว่างกว้าง พื้นที่หายใจทุกที่",
    spacingScale: "Tailwind 1.5x (6px base) — gap/p-12+",
    guideline:
      "padding container 16+, gap ระหว่าง section 24+, max-width แคบกว่าปกติ (max-w-5xl)",
  },
  {
    id: "compact",
    label: "Compact",
    labelTh: "แน่น",
    description: "Dense information, smaller paddings, dashboard-style.",
    descriptionTh: "ข้อมูลแน่น padding น้อย แบบแดชบอร์ด",
    spacingScale: "Tailwind 0.75x (3px base)",
    guideline:
      "padding 2-4, gap 2-3, font-size เล็กลง (sm/xs), table/list/card ติดกัน",
  },
  {
    id: "magazine",
    label: "Magazine",
    labelTh: "นิตยสาร",
    description: "Multi-column text, large hero images, editorial typography.",
    descriptionTh: "ข้อความหลายคอลัมน์ hero ใหญ่ typography แบบบรรณาธิการ",
    spacingScale: "Custom editorial",
    guideline:
      "ใช้ columns-2/3 สำหรับ body text, drop cap, image full-bleed, headline ใหญ่ 6-8xl",
  },
];
