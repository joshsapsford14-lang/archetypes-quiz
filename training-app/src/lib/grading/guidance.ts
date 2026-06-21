import { getTrainingType } from "@/data/trainingTypes";
import type { GradeTier, Intensity, TrainingTypeId } from "@/types";

import type { Guidance } from "./types";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface GuidanceInput {
  typeId: TrainingTypeId;
  durationMin: number;
  intensity: Intensity;
  isExtra: boolean;
  isVariety: boolean;
  grade: GradeTier;
}

// Warm, coach-like guidance. Always praises first, then offers ONE tip.
// Rules-based and modular — easy to swap for an archetype-aware version later.
export function generateGuidance(input: GuidanceInput): Guidance {
  const { typeId, durationMin, intensity, isExtra, isVariety } = input;
  const type = getTrainingType(typeId);
  const label = type.label.toLowerCase();

  // --- Praise: lead with the strongest thing they did. ---
  let praise: string;
  if (isExtra) {
    praise = pick([
      `Extra ${label} on your own time — that's exactly how you pull ahead of players who only train at team sessions.`,
      `You trained on your own today. That's the work nobody sees but everybody feels on matchday. 💪`,
      `Logging an extra session is the single best habit in football. You just did the hard part.`,
    ]);
  } else if (intensity === "hard") {
    praise = pick([
      `You went hard today — that's where the real gains live. Big respect.`,
      `Full intensity on your ${label}. That mindset is what separates players.`,
    ]);
  } else if (durationMin >= 50) {
    praise = pick([
      `${durationMin} minutes locked in — that's serious focus for ${label}.`,
      `Long, focused session. Your stamina and your touch both thank you for that.`,
    ]);
  } else if (isVariety) {
    praise = pick([
      `Nice — you mixed in ${label} this week. Well-rounded players are the hardest to stop.`,
      `Adding ${label} to your week keeps your game balanced. Smart training.`,
    ]);
  } else {
    praise = pick([
      `You showed up and put the work in. Every session counts — that's how habits are built.`,
      `Solid ${label} session. Keeping the habit alive is a win in itself.`,
    ]);
  }

  // --- Tip: target the single biggest opportunity. ---
  let tip: string;
  if (!isExtra) {
    tip = pick([
      `The biggest jumps come from extra sessions on your own. Try sneaking one in before your next practice.`,
      `Want to level up faster? Add one solo session this week — even 15 minutes counts as extra.`,
    ]);
  } else if (intensity === "easy") {
    tip = pick([
      `Next time, push one block to hard. Even 10 minutes at full tilt levels you up faster.`,
      `Try one all-out round next session — your body adapts to the hard moments.`,
    ]);
  } else if (durationMin < 20) {
    tip = pick([
      `Short and sharp is great. Add 10 more minutes next time and you'll feel the difference.`,
      `Nice quick hit — next time stretch it to 25–30 minutes to bank even more.`,
    ]);
  } else {
    const partner = getTrainingType(type.pairWith).label.toLowerCase();
    tip = pick([
      `To round out your week, mix in some ${partner} — it pairs perfectly with ${label}.`,
      `Try adding ${partner} next — variety keeps your whole game sharp (and earns bonus XP).`,
    ]);
  }

  return { praise, tip };
}
