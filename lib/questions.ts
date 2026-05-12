import type { MoodAnswers } from "@/types";

export interface MoodOption {
  value: string;
  label: string;
  labelTh: string;
  emoji: string;
}

export interface MoodQuestion {
  id: keyof MoodAnswers;
  question: string;
  questionTh: string;
  options: MoodOption[];
}

export const moodQuestions: MoodQuestion[] = [
  {
    id: "detailLevel",
    question: "How detailed should the design feel?",
    questionTh: "ดีไซน์ควรมีรายละเอียดแค่ไหน?",
    options: [
      { value: "minimal", label: "Minimal", labelTh: "เรียบที่สุด", emoji: "○" },
      { value: "balanced", label: "Balanced", labelTh: "สมดุล", emoji: "◐" },
      { value: "detailed", label: "Detailed", labelTh: "ละเอียด", emoji: "●" },
    ],
  },
  {
    id: "audience",
    question: "Who is the primary audience?",
    questionTh: "กลุ่มเป้าหมายหลักคือใคร?",
    options: [
      { value: "kids", label: "Kids", labelTh: "เด็ก", emoji: "🧒" },
      { value: "youth", label: "Youth", labelTh: "วัยรุ่น", emoji: "🎮" },
      { value: "adult", label: "Adult", labelTh: "ผู้ใหญ่", emoji: "👤" },
      { value: "professional", label: "B2B", labelTh: "มืออาชีพ", emoji: "💼" },
      { value: "senior", label: "Senior", labelTh: "ผู้สูงวัย", emoji: "👴" },
    ],
  },
  {
    id: "brandVibe",
    question: "What's the brand's personality?",
    questionTh: "บุคลิกของแบรนด์เป็นแบบไหน?",
    options: [
      { value: "playful", label: "Playful", labelTh: "สนุก", emoji: "🎉" },
      { value: "serious", label: "Serious", labelTh: "จริงจัง", emoji: "📊" },
      { value: "luxury", label: "Luxury", labelTh: "หรูหรา", emoji: "💎" },
      { value: "tech", label: "Tech", labelTh: "เทค", emoji: "⚡" },
      { value: "friendly", label: "Friendly", labelTh: "เป็นมิตร", emoji: "🤗" },
    ],
  },
];
