import type { GradeTier, Intensity } from "@/types";

import { GRADING } from "./constants";
import { generateGuidance } from "./guidance";
import type { GradeInput, GradeResult, XpBreakdownItem } from "./types";

function clamp(v: number, lo: number, hi: number): number {
  return Math.min(Math.max(v, lo), hi);
}

/** Unrounded base XP from duration, with tiered diminishing returns. */
export function baseXpFromDuration(durationMin: number): number {
  const capped = clamp(durationMin, 0, GRADING.maxDurationMin);
  let xp = 0;
  let prev = 0;
  for (const tier of GRADING.durationTiers) {
    if (capped <= prev) break;
    const minutesInTier = Math.min(capped, tier.upToMin) - prev;
    if (minutesInTier > 0) xp += minutesInTier * tier.xpPerMin;
    prev = tier.upToMin;
  }
  return xp;
}

interface GradeQuality {
  grade: GradeTier;
  stars: number;
  qualityScore: number;
}

/** Grade reflects effort QUALITY (intensity, extra, focus, variety), not just
 *  clock time — so a sharp 25-min solo session can outscore a lazy hour. */
function computeQuality(args: {
  durationMin: number;
  intensity: Intensity;
  isExtra: boolean;
  isVariety: boolean;
}): GradeQuality {
  const { durationMin, intensity, isExtra, isVariety } = args;
  const base = GRADING.gradeBaseByIntensity[intensity];
  const durationFactor = clamp(
    durationMin / GRADING.durationFactorFullMin,
    GRADING.durationFactorMin,
    GRADING.durationFactorMax,
  );
  let score = base * durationFactor;
  if (isExtra) score += GRADING.extraScoreBonus;
  if (isVariety) score += GRADING.varietyScoreBonus;
  score = clamp(Math.round(score), 5, 100);

  const { S, A, B } = GRADING.gradeThresholds;
  let grade: GradeTier;
  let stars: number;
  if (score >= S) {
    grade = "S";
    stars = 5;
  } else if (score >= A) {
    grade = "A";
    stars = 4;
  } else if (score >= B) {
    grade = "B";
    stars = 3;
  } else {
    grade = "C"; // floor — showing up always earns at least this
    stars = 2;
  }
  return { grade, stars, qualityScore: score };
}

/**
 * Pure session grader. Given a session + weekly context, returns XP, a clean
 * XP breakdown, a grade, and coach-like guidance. No side effects.
 */
export function gradeSession(input: GradeInput): GradeResult {
  const { durationMin, intensity, isExtra, typeId, context } = input;

  const base = baseXpFromDuration(durationMin);
  const intensityMult = GRADING.intensityMult[intensity];
  const extraMult = isExtra ? GRADING.extraMult : 1;
  const streakBonusPct = Math.min(
    context.weeklyStreak * GRADING.streakPerWeek,
    GRADING.streakMaxBonus,
  );
  const streakMult = 1 + streakBonusPct;
  const isVariety = !context.typesTrainedThisWeek.includes(typeId);
  const varietyMult = isVariety ? GRADING.varietyMult : 1;

  // Stepwise rounded running totals so base + bonuses == total EXACTLY.
  const b0 = Math.round(base);
  const v1 = Math.round(base * intensityMult);
  const v2 = Math.round(base * intensityMult * extraMult);
  const v3 = Math.round(base * intensityMult * extraMult * streakMult);
  const v4 = Math.round(base * intensityMult * extraMult * streakMult * varietyMult);

  const breakdown: XpBreakdownItem[] = [
    { key: "base", label: "Base XP", xp: b0, kind: "base" },
  ];
  if (v1 - b0 > 0) {
    breakdown.push({
      key: "intensity",
      label: `Intensity · ${intensity}`,
      xp: v1 - b0,
      kind: "bonus",
    });
  }
  if (isExtra && v2 - v1 > 0) {
    breakdown.push({ key: "extra", label: "Extra session", xp: v2 - v1, kind: "bonus" });
  }
  if (v3 - v2 > 0) {
    breakdown.push({
      key: "streak",
      label: `${context.weeklyStreak}-week streak`,
      xp: v3 - v2,
      kind: "bonus",
    });
  }
  if (isVariety && v4 - v3 > 0) {
    breakdown.push({ key: "variety", label: "Variety bonus", xp: v4 - v3, kind: "bonus" });
  }

  const quality = computeQuality({ durationMin, intensity, isExtra, isVariety });
  const guidance = generateGuidance({
    typeId,
    durationMin,
    intensity,
    isExtra,
    isVariety,
    grade: quality.grade,
  });

  return {
    baseXp: b0,
    totalXp: v4,
    breakdown,
    grade: quality.grade,
    stars: quality.stars,
    qualityScore: quality.qualityScore,
    isVariety,
    guidance,
  };
}
