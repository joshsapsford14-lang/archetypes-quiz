import type { TrainingType, TrainingTypeId } from "@/types";

// The training menu. Order roughly groups technical -> finishing -> game -> physical.
export const TRAINING_TYPES: TrainingType[] = [
  {
    id: "juggling",
    label: "Juggling & Ball Mastery",
    emoji: "🤹",
    blurb: "Touch, control, comfort on the ball",
    category: "technical",
    accent: "volt",
    pairWith: "weakfoot",
  },
  {
    id: "dribbling",
    label: "Dribbling",
    emoji: "⚡",
    blurb: "Close control, changes of direction",
    category: "technical",
    accent: "volt",
    pairWith: "1v1s",
  },
  {
    id: "passing",
    label: "Passing & Rondos",
    emoji: "🔗",
    blurb: "Weight, timing, keeping it ticking",
    category: "technical",
    accent: "aqua",
    pairWith: "ssg",
  },
  {
    id: "weakfoot",
    label: "Weak Foot",
    emoji: "🦶",
    blurb: "Become two-footed and unreadable",
    category: "technical",
    accent: "volt",
    pairWith: "finishing",
  },
  {
    id: "wallwork",
    label: "Wall Work",
    emoji: "🧱",
    blurb: "Reps off the wall — first touch & passing",
    category: "technical",
    accent: "volt",
    pairWith: "passing",
  },
  {
    id: "finishing",
    label: "Finishing & Shooting",
    emoji: "🥅",
    blurb: "Power, placement, composure in the box",
    category: "finishing",
    accent: "flame",
    pairWith: "weakfoot",
  },
  {
    id: "freekicks",
    label: "Free Kicks",
    emoji: "🎯",
    blurb: "Dead-ball technique & precision",
    category: "finishing",
    accent: "flame",
    pairWith: "finishing",
  },
  {
    id: "1v1s",
    label: "1v1s",
    emoji: "⚔️",
    blurb: "Beat your man, win your duels",
    category: "game",
    accent: "flame",
    pairWith: "dribbling",
  },
  {
    id: "ssg",
    label: "Small-Sided Game",
    emoji: "🆚",
    blurb: "Game reps — decisions under pressure",
    category: "game",
    accent: "flame",
    pairWith: "passing",
  },
  {
    id: "sprint",
    label: "Sprint & Fitness",
    emoji: "💨",
    blurb: "Speed, repeated sprints, engine",
    category: "physical",
    accent: "aqua",
    pairWith: "strength",
  },
  {
    id: "strength",
    label: "Strength & Conditioning",
    emoji: "💪",
    blurb: "Power, robustness, injury-proofing",
    category: "physical",
    accent: "aqua",
    pairWith: "sprint",
  },
];

const BY_ID: Record<TrainingTypeId, TrainingType> = Object.fromEntries(
  TRAINING_TYPES.map((t) => [t.id, t]),
) as Record<TrainingTypeId, TrainingType>;

export function getTrainingType(id: TrainingTypeId): TrainingType {
  return BY_ID[id];
}
