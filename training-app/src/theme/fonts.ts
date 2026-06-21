// Font family names — must match the keys passed to useFonts() in
// app/_layout.tsx AND the fontFamily entries in tailwind.config.js.
export const fonts = {
  display: "Anton", // big numbers, ranks, levels — jersey/scoreboard energy
  body: "DMSans",
  bodyMedium: "DMSans-Medium",
  bodyBold: "DMSans-Bold",
  hud: "SpaceMono", // XP counts, stats, timers — game-HUD feel
  hudBold: "SpaceMono-Bold",
} as const;
