import type { Friend } from "@/types";

// Mock squad so the social experience is fully visible in the beta.
// weeklyXp values place the player mid-pack — someone just ahead to chase,
// someone just behind keeping the pressure on.
const HOURS = 3600 * 1000;

function hoursAgo(h: number): string {
  return new Date(Date.now() - h * HOURS).toISOString();
}

export const MOCK_FRIENDS: Friend[] = [
  {
    id: "leo",
    name: "Leo",
    initials: "LE",
    avatarColor: "#FF5A2C",
    weeklyXp: 540,
    level: 11,
    activity: {
      id: "leo-1",
      typeId: "finishing",
      durationMin: 45,
      isExtra: true,
      createdAt: hoursAgo(2),
      kudos: 4,
    },
  },
  {
    id: "mia",
    name: "Mia",
    initials: "MI",
    avatarColor: "#2BD9FF",
    weeklyXp: 470,
    level: 10,
    activity: {
      id: "mia-1",
      typeId: "sprint",
      durationMin: 30,
      isExtra: true,
      createdAt: hoursAgo(5),
      kudos: 6,
    },
  },
  {
    id: "theo",
    name: "Theo",
    initials: "TH",
    avatarColor: "#FFC53D",
    weeklyXp: 305,
    level: 8,
    activity: {
      id: "theo-1",
      typeId: "1v1s",
      durationMin: 25,
      isExtra: false,
      createdAt: hoursAgo(9),
      kudos: 2,
    },
  },
  {
    id: "jay",
    name: "Jay",
    initials: "JA",
    avatarColor: "#34E5A3",
    weeklyXp: 210,
    level: 6,
    activity: {
      id: "jay-1",
      typeId: "juggling",
      durationMin: 20,
      isExtra: true,
      createdAt: hoursAgo(20),
      kudos: 3,
    },
  },
  {
    id: "sofia",
    name: "Sofia",
    initials: "SO",
    avatarColor: "#FF6FA5",
    weeklyXp: 150,
    level: 5,
    activity: {
      id: "sofia-1",
      typeId: "passing",
      durationMin: 35,
      isExtra: false,
      createdAt: hoursAgo(26),
      kudos: 1,
    },
  },
  {
    id: "finn",
    name: "Finn",
    initials: "FI",
    avatarColor: "#5AA9FF",
    weeklyXp: 80,
    level: 4,
    activity: {
      id: "finn-1",
      typeId: "weakfoot",
      durationMin: 20,
      isExtra: true,
      createdAt: hoursAgo(34),
      kudos: 2,
    },
  },
];
