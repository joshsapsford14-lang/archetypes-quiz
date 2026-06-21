# Touchline ⚽️ _(working title)_

A football training app for young players that works like a video game — **Strava for football, built for kids.** Players log the training they actually do and get rewarded instantly with XP, levels, streaks, session grades, and a spot on the leaderboard against their mates. The core belief: **you only level up if you actually train.**

> **Status: BASE BETA, running on local mock data.** Everything works end-to-end without a backend so the experience can be felt and approved first. Supabase (real accounts + live leaderboard) is designed and ready (`supabase/schema.sql`) but intentionally **not wired up yet**.

> **"Touchline" is a working title** — change the single `APP_NAME` constant in `src/config.ts` to rebrand.

---

## Stack

- **Expo (React Native) + TypeScript** — one codebase for iOS, Android, and web
- **Expo Router** — file-based routing (great web preview, per-screen URLs)
- **NativeWind v4** (Tailwind) — styling, with the brand palette as theme tokens
- **Zustand** — state management (persisted via AsyncStorage)
- **Reanimated 4** — the snappy reward/micro-animations (reduced-motion aware)
- **react-native-svg** — the XP progress ring
- **Anton / DM Sans / Space Mono** — display / body / HUD fonts

## Getting started

```bash
cd training-app
npm install
npm run web      # open the app in your browser
# or
npm start        # then press i / a, or scan the QR with Expo Go
```

> Heads-up: this project was set up in an environment where Expo's API host was
> blocked, so dependencies are pinned to SDK-56-compatible versions directly in
> `package.json` (instead of via `expo install`). On a normal machine
> `npx expo install <pkg>` works as usual.

## Project structure

```
app/                      # Expo Router routes (thin — they render screens)
  _layout.tsx             # root: fonts, providers, modal route
  (tabs)/                 # Today · Squad · Progress · Profile
  log.tsx                 # Log a session (modal) -> reward
src/
  components/             # reusable UI (ui/), plus log/ squad/ progress/ navigation/
  screens/               # one folder per screen (home, log, squad, progress, profile)
  lib/
    grading/             # the modular session grader (see below)
    stats.ts             # pure selectors: today/week XP, streak, balance, summary
    progression.ts       # XP -> level -> rank ladder
    hooks/               # useCountUp, useTween, useReducedMotion
  store/useGameStore.ts  # Zustand store (sessions + kudos, persisted)
  data/                  # training types, ranks, mock friends, seed history
  theme/                 # color + font tokens (mirror tailwind.config.js)
  config.ts              # APP_NAME, DAILY_XP_GOAL
supabase/schema.sql      # backend schema (ready, not wired)
```

## Session grading (modular & transparent)

All grading lives in `src/lib/grading/` and is a **pure function** — easy to read,
tune, and later upgrade (a smarter, player-identity-aware engine will layer on
top). Tune everything in `src/lib/grading/constants.ts`.

- **Duration → base XP**: tiered with gentle diminishing returns (≈2 XP/min
  early, tapering, flat past ~75 min) so no kid is pushed to overtrain.
- **Intensity** ×: easy 1.0 · moderate 1.2 · hard 1.4
- **Extra session** ×1.5 — training on your own time, the behaviour we most reward
- **Streak** +3%/week of the weekly-goal streak, capped +15%
- **Variety** +10% for a training type that's new to the week
- **Grade (S/A/B/C + stars)** reflects effort *quality* (intensity, extra, focus,
  variety), **not** clock time — so a sharp 25-min solo session can outscore a
  lazy hour. Floored at **C** so showing up always counts.
- **Coach guidance**: one warm bit of praise + one helpful tip, every time.

### Streaks: weekly-goal model (kid-friendly)

Instead of a pure daily streak (which can pressure kids to train through
fatigue), a streak counts **consecutive weeks** where they trained on ≥ 4 days.
A slow current week never breaks it — rest is built in. See `weeklyStreak()` in
`src/lib/stats.ts`.

## Design system

"Football pitch under floodlights at night." Tokens live in
`tailwind.config.js` and `src/theme/`.

| Token | Hex | Use |
|------|------|-----|
| `pitch` | `#0A1410` | base background |
| `surface` | `#0F1D17` | cards |
| `line` | `#1C3329` | borders / pitch lines |
| `chalk` | `#F2F5EE` | text |
| `muted` | `#8FA396` | muted text |
| `volt` | `#D4FF3D` | energy / XP / primary action |
| `aqua` / `flame` | `#2BD9FF` / `#FF5A2C` | secondary accents (sparingly) |

Fonts: `font-display` (Anton), `font-body` (DM Sans), `font-hud` (Space Mono).
All animations respect the OS **reduce-motion** setting.

## Mock data

A populated history is seeded on first run (see `src/data/seed.ts`) so the app
feels alive immediately. **Profile → Reset demo data** restores it.

## Wiring up Supabase (later)

1. Create a Supabase project and run `supabase/schema.sql` in the SQL editor.
2. `npx expo install @supabase/supabase-js` and add a client in `src/lib/supabase.ts`.
3. Swap the data source: `useGameStore` already encapsulates reads/writes, so the
   main change is persisting sessions/kudos to Supabase and sourcing the
   leaderboard from the `weekly_leaderboard` view instead of `mockFriends`.

## Roadmap

- Supabase backend: auth, real sessions, live leaderboard, friend requests
- **Archetype identity integration** — personalise grading & coaching to a
  player's Magician / Conductor / Warrior profile (the grader is built modular
  for exactly this)
- Anti-gaming for logged sessions (photo / parent verify), richer celebrations
