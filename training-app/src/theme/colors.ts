// Brand color tokens — "football pitch under floodlights at night".
// Mirrors tailwind.config.js so non-className contexts (SVG, Reanimated,
// navigation theme, status bar) draw from the same source of truth.
export const colors = {
  pitch: "#0A1410", // base background
  surface: "#0F1D17", // raised surfaces (cards)
  surface2: "#13251C", // slightly elevated surface
  line: "#1C3329", // borders / pitch lines
  chalk: "#F2F5EE", // primary text
  muted: "#8FA396", // muted text
  volt: "#D4FF3D", // energy / XP / primary action
  aqua: "#2BD9FF", // secondary accent
  flame: "#FF5A2C", // secondary accent
} as const;

export type ColorToken = keyof typeof colors;
