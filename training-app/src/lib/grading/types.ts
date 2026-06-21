import type { GradeTier, Intensity, TrainingTypeId } from "@/types";

export interface GradeContext {
  /** Consecutive weeks the weekly goal was met (long-term consistency). */
  weeklyStreak: number;
  /** Training types already done earlier this week (drives the variety bonus). */
  typesTrainedThisWeek: TrainingTypeId[];
}

export interface GradeInput {
  typeId: TrainingTypeId;
  durationMin: number;
  intensity: Intensity;
  isExtra: boolean;
  context: GradeContext;
}

export interface XpBreakdownItem {
  key: string;
  label: string;
  xp: number;
  kind: "base" | "bonus";
}

export interface Guidance {
  praise: string; // what they did well
  tip: string; // one thing to make the next session better
}

export interface GradeResult {
  baseXp: number;
  totalXp: number;
  breakdown: XpBreakdownItem[];
  grade: GradeTier;
  stars: number; // 2..5
  qualityScore: number; // 0..100 (internal-ish, surfaced subtly)
  isVariety: boolean;
  guidance: Guidance;
}
