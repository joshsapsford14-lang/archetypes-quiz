// All grading tuning lives here so it's a single, transparent place to upgrade.
// (A smarter, player-identity-aware engine will layer on top of this later.)

export const GRADING = {
  // Duration -> base XP. Tiered with gentle diminishing returns so longer is
  // better, but no kid is ever pushed to overtrain. Flattens hard past ~75 min.
  durationTiers: [
    { upToMin: 20, xpPerMin: 2.0 },
    { upToMin: 45, xpPerMin: 1.5 },
    { upToMin: 75, xpPerMin: 1.0 },
    { upToMin: 120, xpPerMin: 0.5 },
  ] as const,
  maxDurationMin: 120,

  // Multipliers, stacked.
  intensityMult: { easy: 1.0, moderate: 1.2, hard: 1.4 } as const,
  extraMult: 1.5, // training on their own time — the behaviour we most reward
  streakPerWeek: 0.03, // +3% per consecutive weekly-goal week...
  streakMaxBonus: 0.15, // ...capped at +15%
  varietyMult: 1.1, // +10% for a training type that's new to this week

  // Grade (effort QUALITY, not clock time). Base score by intensity, scaled by
  // duration adequacy, plus bonuses. Floored at "C" so showing up always counts.
  gradeBaseByIntensity: { easy: 40, moderate: 60, hard: 78 } as const,
  durationFactorMin: 0.55,
  durationFactorFullMin: 45, // duration at which you get the full factor
  durationFactorMax: 1.1,
  extraScoreBonus: 12,
  varietyScoreBonus: 6,
  gradeThresholds: { S: 85, A: 68, B: 50 } as const, // else C

  // Weekly-streak model: a "good week" = trained on at least this many days.
  weeklyGoalDays: 4,
} as const;
