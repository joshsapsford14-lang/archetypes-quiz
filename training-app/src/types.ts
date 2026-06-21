// Shared domain types for the app.

export type TrainingTypeId =
  | "1v1s"
  | "finishing"
  | "juggling"
  | "passing"
  | "dribbling"
  | "sprint"
  | "weakfoot"
  | "ssg"
  | "wallwork"
  | "freekicks"
  | "strength";

export type Intensity = "easy" | "moderate" | "hard";

export type Accent = "volt" | "aqua" | "flame";

export type TrainingCategory =
  | "technical"
  | "physical"
  | "game"
  | "finishing";

export interface TrainingType {
  id: TrainingTypeId;
  label: string; // display label
  emoji: string;
  blurb: string; // one-line description shown in the picker
  category: TrainingCategory;
  accent: Accent;
  /** A complementary type to suggest for variety / balance. */
  pairWith: TrainingTypeId;
}

export type GradeTier = "S" | "A" | "B" | "C";

export interface Session {
  id: string;
  typeId: TrainingTypeId;
  durationMin: number;
  intensity: Intensity;
  isExtra: boolean;
  xp: number;
  grade: GradeTier;
  stars: number;
  createdAt: string; // ISO timestamp
}

export interface Rank {
  id: string;
  name: string;
  emoji: string;
  minLevel: number;
  accent: Accent;
}

export interface FriendActivity {
  id: string;
  typeId: TrainingTypeId;
  durationMin: number;
  isExtra: boolean;
  createdAt: string; // ISO
  kudos: number;
}

export interface Friend {
  id: string;
  name: string;
  initials: string;
  avatarColor: string;
  weeklyXp: number;
  level: number;
  isYou?: boolean;
  activity?: FriendActivity; // most recent session, for the feed
}
