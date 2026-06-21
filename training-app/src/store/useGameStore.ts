import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { buildSeedSessions } from "@/data/seed";
import { gradeSession, type GradeResult } from "@/lib/grading";
import { typesTrainedThisWeek, weeklyStreak } from "@/lib/stats";
import type { Intensity, Session, TrainingTypeId } from "@/types";

export interface LogSessionInput {
  typeId: TrainingTypeId;
  durationMin: number;
  intensity: Intensity;
  isExtra: boolean;
}

export interface LogSessionResult {
  session: Session;
  result: GradeResult;
}

interface GameState {
  sessions: Session[];
  kudos: Record<string, boolean>; // friend activity id -> kudos given
  /** Grade + persist a new session. Returns the result for the reward screen. */
  logSession: (input: LogSessionInput) => LogSessionResult;
  toggleKudos: (activityId: string) => void;
  resetProgress: () => void;
}

let idCounter = 0;
function newId(): string {
  idCounter += 1;
  return `s-${Date.now()}-${idCounter}`;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      sessions: buildSeedSessions(),
      kudos: {},

      logSession: (input) => {
        const { sessions } = get();
        // Context is computed from state BEFORE this session is added:
        // streak + which types were already trained this week (for variety).
        const result = gradeSession({
          ...input,
          context: {
            weeklyStreak: weeklyStreak(sessions),
            typesTrainedThisWeek: typesTrainedThisWeek(sessions),
          },
        });
        const session: Session = {
          id: newId(),
          typeId: input.typeId,
          durationMin: input.durationMin,
          intensity: input.intensity,
          isExtra: input.isExtra,
          xp: result.totalXp,
          grade: result.grade,
          stars: result.stars,
          createdAt: new Date().toISOString(),
        };
        set({ sessions: [session, ...sessions] });
        return { session, result };
      },

      toggleKudos: (activityId) =>
        set((state) => ({
          kudos: { ...state.kudos, [activityId]: !state.kudos[activityId] },
        })),

      resetProgress: () => set({ sessions: buildSeedSessions(), kudos: {} }),
    }),
    {
      name: "touchline-game-v1",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ sessions: state.sessions, kudos: state.kudos }),
    },
  ),
);
