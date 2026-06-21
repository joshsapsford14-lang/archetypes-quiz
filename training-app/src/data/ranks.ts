import type { Rank } from "@/types";

// The rank ladder players climb. minLevel is the level at which the rank unlocks.
// Rookie -> Prospect -> Baller -> Elite -> Star -> Maestro -> Legend.
export const RANKS: Rank[] = [
  { id: "rookie", name: "Rookie", emoji: "🌱", minLevel: 1, accent: "aqua" },
  { id: "prospect", name: "Prospect", emoji: "⭐", minLevel: 5, accent: "aqua" },
  { id: "baller", name: "Baller", emoji: "🔥", minLevel: 10, accent: "volt" },
  { id: "elite", name: "Elite", emoji: "💎", minLevel: 18, accent: "volt" },
  { id: "star", name: "Star", emoji: "🌟", minLevel: 28, accent: "flame" },
  { id: "maestro", name: "Maestro", emoji: "👑", minLevel: 40, accent: "flame" },
  { id: "legend", name: "Legend", emoji: "🏆", minLevel: 55, accent: "flame" },
];
