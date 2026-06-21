import { getTrainingType } from "@/data/trainingTypes";
import type { Session, TrainingTypeId } from "@/types";

import { addDays, isThisWeek, isToday, startOfDay, startOfWeek } from "./date";
import { GRADING } from "./grading";

export function totalXp(sessions: Session[]): number {
  return sessions.reduce((sum, s) => sum + s.xp, 0);
}

export function todayXp(sessions: Session[]): number {
  return sessions.filter((s) => isToday(s.createdAt)).reduce((sum, s) => sum + s.xp, 0);
}

export function weeklyXp(sessions: Session[]): number {
  return sessions.filter((s) => isThisWeek(s.createdAt)).reduce((sum, s) => sum + s.xp, 0);
}

export function weeklySessionCount(sessions: Session[]): number {
  return sessions.filter((s) => isThisWeek(s.createdAt)).length;
}

export function weeklyMinutes(sessions: Session[]): number {
  return sessions
    .filter((s) => isThisWeek(s.createdAt))
    .reduce((sum, s) => sum + s.durationMin, 0);
}

export function daysTrainedThisWeek(sessions: Session[]): number {
  const days = new Set(
    sessions
      .filter((s) => isThisWeek(s.createdAt))
      .map((s) => startOfDay(new Date(s.createdAt)).getTime()),
  );
  return days.size;
}

/** Distinct training types done this week (optionally excluding one id). */
export function typesTrainedThisWeek(
  sessions: Session[],
  exclude?: TrainingTypeId,
): TrainingTypeId[] {
  const set = new Set<TrainingTypeId>();
  for (const s of sessions) {
    if (isThisWeek(s.createdAt) && s.typeId !== exclude) set.add(s.typeId);
  }
  return [...set];
}

function distinctDayCountByWeek(sessions: Session[]): Map<number, number> {
  const byWeek = new Map<number, Set<number>>();
  for (const s of sessions) {
    const d = new Date(s.createdAt);
    const wk = startOfWeek(d).getTime();
    const day = startOfDay(d).getTime();
    if (!byWeek.has(wk)) byWeek.set(wk, new Set());
    byWeek.get(wk)!.add(day);
  }
  const counts = new Map<number, number>();
  byWeek.forEach((set, wk) => counts.set(wk, set.size));
  return counts;
}

/**
 * Weekly-goal streak with built-in rest protection: counts consecutive weeks
 * where the player trained on >= goalDays days. A slow CURRENT week never
 * breaks the streak (it's still in progress) — only a finished week that
 * missed the goal resets it.
 */
export function weeklyStreak(
  sessions: Session[],
  goalDays: number = GRADING.weeklyGoalDays,
  now: Date = new Date(),
): number {
  if (sessions.length === 0) return 0;
  const counts = distinctDayCountByWeek(sessions);
  const earliest = Math.min(...counts.keys());
  const daysIn = (d: Date) => counts.get(d.getTime()) ?? 0;

  let streak = 0;
  let cursor = startOfWeek(now);
  if (daysIn(cursor) >= goalDays) streak += 1; // current week already qualifies
  cursor = startOfWeek(addDays(cursor, -7));
  while (cursor.getTime() >= earliest) {
    if (daysIn(cursor) >= goalDays) {
      streak += 1;
      cursor = startOfWeek(addDays(cursor, -7));
    } else {
      break;
    }
  }
  return streak;
}

/** Longest run of consecutive qualifying weeks across all history. */
export function bestWeeklyStreak(
  sessions: Session[],
  goalDays: number = GRADING.weeklyGoalDays,
): number {
  if (sessions.length === 0) return 0;
  const counts = distinctDayCountByWeek(sessions);
  const weeks = [...counts.keys()].sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  let prevWeek: number | null = null;
  for (const wk of weeks) {
    const qualifies = (counts.get(wk) ?? 0) >= goalDays;
    const consecutive = prevWeek !== null && wk === startOfWeek(addDays(new Date(prevWeek), 7)).getTime();
    if (qualifies) {
      run = consecutive ? run + 1 : 1;
      best = Math.max(best, run);
    } else {
      run = 0;
    }
    prevWeek = wk;
  }
  return best;
}

export interface WeeklySummary {
  minutes: number;
  sessions: number;
  xp: number;
  bestStreak: number;
  daysTrained: number;
  goalDays: number;
}

export function weeklySummary(sessions: Session[]): WeeklySummary {
  return {
    minutes: weeklyMinutes(sessions),
    sessions: weeklySessionCount(sessions),
    xp: weeklyXp(sessions),
    bestStreak: bestWeeklyStreak(sessions),
    daysTrained: daysTrainedThisWeek(sessions),
    goalDays: GRADING.weeklyGoalDays,
  };
}

export type BalanceTone = "balanced" | "mix" | "rest";

export interface TrainingBalance {
  tone: BalanceTone;
  title: string;
  message: string;
}

/** Light, encouraging nudge — never clinical. Looks at the last 7 days. */
export function trainingBalance(sessions: Session[], now: Date = new Date()): TrainingBalance {
  const cutoff = addDays(startOfDay(now), -6).getTime();
  const recent = sessions.filter((s) => new Date(s.createdAt).getTime() >= cutoff);

  if (recent.length === 0) {
    return {
      tone: "balanced",
      title: "Ready when you are",
      message: "Log a session and we'll keep an eye on your training balance.",
    };
  }

  const days = new Set(recent.map((s) => startOfDay(new Date(s.createdAt)).getTime())).size;
  const minutes = recent.reduce((sum, s) => sum + s.durationMin, 0);

  if (days >= 6 || minutes >= 360) {
    return {
      tone: "rest",
      title: "Huge week — bank a rest day",
      message:
        "You've put in serious work. A rest day now is when the gains actually stick. No streak pressure here.",
    };
  }

  const counts = new Map<TrainingTypeId, number>();
  recent.forEach((s) => counts.set(s.typeId, (counts.get(s.typeId) ?? 0) + 1));
  let topId: TrainingTypeId | null = null;
  let topCount = 0;
  counts.forEach((c, id) => {
    if (c > topCount) {
      topCount = c;
      topId = id;
    }
  });

  if (recent.length >= 3 && topId && topCount / recent.length >= 0.6) {
    const type = getTrainingType(topId);
    const partner = getTrainingType(type.pairWith);
    return {
      tone: "mix",
      title: "Try mixing it up",
      message: `Loads of ${type.label.toLowerCase()} lately — nice focus! Throw in some ${partner.label.toLowerCase()} to round out your game (and grab a variety bonus).`,
    };
  }

  return {
    tone: "balanced",
    title: "Great balance",
    message: "You're spreading your training nicely across the week. Keep it rolling.",
  };
}
