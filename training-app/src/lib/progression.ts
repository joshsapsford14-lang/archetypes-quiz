import { RANKS } from "@/data/ranks";
import type { Rank } from "@/types";

// XP required to advance FROM `level` to the next level. Grows linearly so the
// climb gets steeper but never brutal.
export function xpForLevel(level: number): number {
  return 120 + (level - 1) * 30;
}

export interface LevelInfo {
  level: number;
  xpIntoLevel: number; // XP earned toward the next level
  xpForNext: number; // XP needed to reach the next level
  progress: number; // 0..1 toward next level
  totalXp: number;
}

export function levelFromXp(totalXp: number): LevelInfo {
  let level = 1;
  let remaining = Math.max(0, Math.floor(totalXp));
  while (remaining >= xpForLevel(level)) {
    remaining -= xpForLevel(level);
    level += 1;
  }
  const xpForNext = xpForLevel(level);
  return {
    level,
    xpIntoLevel: remaining,
    xpForNext,
    progress: xpForNext === 0 ? 0 : remaining / xpForNext,
    totalXp,
  };
}

export function rankForLevel(level: number): Rank {
  let current = RANKS[0];
  for (const rank of RANKS) {
    if (level >= rank.minLevel) current = rank;
  }
  return current;
}

export function nextRank(level: number): Rank | null {
  return RANKS.find((r) => r.minLevel > level) ?? null;
}

/** Minimum total XP needed to reach a given level (cumulative). */
export function totalXpForLevel(level: number): number {
  let xp = 0;
  for (let l = 1; l < level; l += 1) xp += xpForLevel(l);
  return xp;
}
