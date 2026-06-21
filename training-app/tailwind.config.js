/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // "Football pitch under floodlights at night"
        pitch: "#0A1410", // base background — deep night-pitch green-black
        surface: "#0F1D17", // raised surfaces (cards)
        "surface-2": "#13251C", // slightly elevated surface for layering
        line: "#1C3329", // borders / pitch lines
        chalk: "#F2F5EE", // primary text (chalk)
        muted: "#8FA396", // muted text
        volt: "#D4FF3D", // energy / XP / primary action — hi-vis training-bib lime
        aqua: "#2BD9FF", // secondary accent (use sparingly)
        flame: "#FF5A2C", // secondary accent (use sparingly)
      },
      fontFamily: {
        display: ["Anton"], // big numbers, ranks, levels
        body: ["DMSans"],
        "body-md": ["DMSans-Medium"],
        "body-bold": ["DMSans-Bold"],
        hud: ["SpaceMono"], // XP counts, stats, timers
        "hud-bold": ["SpaceMono-Bold"],
      },
      borderRadius: {
        xl: "16px",
        "2xl": "20px",
        "3xl": "28px",
      },
    },
  },
  plugins: [],
};
