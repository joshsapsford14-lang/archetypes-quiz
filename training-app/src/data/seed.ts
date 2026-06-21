import { addDays, startOfDay, startOfWeek } from "@/lib/date";
import { gradeSession } from "@/lib/grading";
import type { Intensity, Session, TrainingTypeId } from "@/types";

// Mock history so a first-time beta user sees a lively, populated app:
// a couple of recent sessions plus three prior "good weeks" to build a streak.
interface SeedSpec {
  typeId: TrainingTypeId;
  durationMin: number;
  intensity: Intensity;
  isExtra: boolean;
  // Either an absolute days-ago, or week-relative coordinates (weeksAgo + dow).
  daysAgo?: number;
  weeksAgo?: number;
  dow?: number; // 0 = Monday ... 6 = Sunday
  hour: number;
}

const SPECS: SeedSpec[] = [
  // This week (recent activity for a lively Home + feed)
  { typeId: "finishing", durationMin: 30, intensity: "moderate", isExtra: true, daysAgo: 0, hour: 17 },
  { typeId: "dribbling", durationMin: 25, intensity: "hard", isExtra: true, daysAgo: 1, hour: 18 },
  // 1 week ago — qualifying week (4 days)
  { typeId: "finishing", durationMin: 35, intensity: "hard", isExtra: true, weeksAgo: 1, dow: 0, hour: 17 },
  { typeId: "passing", durationMin: 40, intensity: "moderate", isExtra: false, weeksAgo: 1, dow: 2, hour: 16 },
  { typeId: "dribbling", durationMin: 30, intensity: "hard", isExtra: true, weeksAgo: 1, dow: 4, hour: 18 },
  { typeId: "ssg", durationMin: 60, intensity: "moderate", isExtra: false, weeksAgo: 1, dow: 6, hour: 11 },
  // 2 weeks ago — qualifying week (4 days)
  { typeId: "juggling", durationMin: 20, intensity: "easy", isExtra: true, weeksAgo: 2, dow: 0, hour: 7 },
  { typeId: "sprint", durationMin: 25, intensity: "hard", isExtra: false, weeksAgo: 2, dow: 2, hour: 17 },
  { typeId: "finishing", durationMin: 30, intensity: "moderate", isExtra: true, weeksAgo: 2, dow: 4, hour: 18 },
  { typeId: "1v1s", durationMin: 30, intensity: "hard", isExtra: true, weeksAgo: 2, dow: 5, hour: 16 },
  // 3 weeks ago — qualifying week (4 days)
  { typeId: "weakfoot", durationMin: 25, intensity: "moderate", isExtra: true, weeksAgo: 3, dow: 1, hour: 17 },
  { typeId: "passing", durationMin: 35, intensity: "moderate", isExtra: false, weeksAgo: 3, dow: 3, hour: 16 },
  { typeId: "strength", durationMin: 30, intensity: "hard", isExtra: false, weeksAgo: 3, dow: 5, hour: 19 },
  { typeId: "dribbling", durationMin: 25, intensity: "hard", isExtra: true, weeksAgo: 3, dow: 6, hour: 10 },
];

function atHour(d: Date, hour: number): Date {
  const x = new Date(d);
  x.setHours(hour, 0, 0, 0);
  return x;
}

function specDate(spec: SeedSpec, now: Date): Date {
  if (spec.daysAgo !== undefined) {
    return atHour(addDays(startOfDay(now), -spec.daysAgo), spec.hour);
  }
  const weekStart = startOfWeek(now);
  return atHour(addDays(weekStart, -7 * (spec.weeksAgo ?? 0) + (spec.dow ?? 0)), spec.hour);
}

export function buildSeedSessions(now: Date = new Date()): Session[] {
  const sessions = SPECS.map((spec, i) => {
    const date = specDate(spec, now);
    // Grade with a neutral context — historical XP needn't be exact, just sane.
    const result = gradeSession({
      typeId: spec.typeId,
      durationMin: spec.durationMin,
      intensity: spec.intensity,
      isExtra: spec.isExtra,
      context: { weeklyStreak: 0, typesTrainedThisWeek: [] },
    });
    return {
      id: `seed-${i}`,
      typeId: spec.typeId,
      durationMin: spec.durationMin,
      intensity: spec.intensity,
      isExtra: spec.isExtra,
      xp: result.totalXp,
      grade: result.grade,
      stars: result.stars,
      createdAt: date.toISOString(),
    } satisfies Session;
  });
  // Newest first.
  return sessions.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}
