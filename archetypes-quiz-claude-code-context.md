# ARCHETYPES QUIZ — CLAUDE CODE CONTEXT

## What This Is

This is the Archetypes Football Identity Quiz — a web-based interactive quiz built as a single HTML file. It identifies a footballer's identity across three archetypes (Magician, Conductor, Warrior) and produces a personalised identity report.

The quiz is the core product of Archetypes — a football player identity and development system built by Josh, a football coach. It is currently hosted on Netlify and shared via link on social media.

---

## The Mission — Read This First

Archetypes is the gateway to turning a true love and passion for football into a true love and passion for who you are as a footballer.

Most young players spend their entire development focused on other footballers — what those players can do, what they themselves can't. Kids consume content about others constantly. Archetypes asks a different question: what if they saw content about themselves?

Every player has value. Every identity is valid. The job of this quiz — and everything Archetypes produces — is to make that value come to life for the player in the most exciting way possible. Not just accurate. Exciting. The report should feel like the most honest, insightful thing anyone has ever said to them about their football.

The feeling a player should have when they finish the quiz and read their report:

**"How does this know me better than my coach does?"**

That's the bar. Everything in the quiz — the questions, the scoring, the profiles, the player comparisons, the game scenarios — exists to produce that feeling.

---

## The Three Archetypes

Every footballer is a unique blend of all three, expressed as percentages. The quiz identifies their primary, secondary, and tertiary archetype and explains how all three show up in their game.

### ⚡ MAGICIAN — "Can I do it?"
Pursues moments. Creativity, flair, unpredictability. Mistakes are fuel not discouragement. Loves freedom, hates being simplified. Loses confidence when read or pocketed. At their best when the game needs something special.
Examples: Mbappé, Neymar, Cristián Romero, Lamine Yamal, Zlatan, Di María, Ronaldinho

### ♟ CONDUCTOR — "Should it be done?"
Pursues the right decision. Controls tempo, brings the best out of teammates, consistent from minute 1-90. Loses confidence when they lose control of their own game. Frustrated by poor decisions and unnecessary mistakes.
Examples: Kroos, Busquets, Kane, Saliba, Saka, Özil, Pirlo, Pedri, Lampard, Maldini

### ⚔ WARRIOR — "Will this help the team win?"
Plays for the badge. Intensity and desire are the fuel — physicality used for the team not themselves. Loses confidence when outfought. Pure Warriors are often the least ego-driven players on the pitch — they need the win, not the glory.
Examples: Haaland, Declan Rice, Valverde, Gabriel, Gattuso, Raphinha, Martinelli, Gavi

---

## The Quiz Structure

**Who is this for:** Players of any age (9+), parents completing it on behalf of their child, or coaches completing it about one of their players. The quiz detects which mode and adjusts language throughout.

**Format:** 10 questions across three types:
- Part 1 (Questions 1-2): Rate 1-5 — belief statements about how football is won. Tests underlying philosophy, not behaviour. Harder to game than multiple choice.
- Part 2 (Questions 3-8): Multiple choice — instinct-based scenario questions. Answer order is randomised each session so there's no pattern to follow.
- Part 3 (Questions 9-10 + open): Open-ended questions about position, player they love watching, and what compliment would feel hollow. Scored by AI (Claude API) when API key is present, fallback keyword scoring when not.

**The report includes:**
1. Archetype percentage breakdown (Magician / Conductor / Warrior bars)
2. Profile name and tagline
3. Identity snapshot — written in the founder's voice, validates identity before developing it
4. "Your Instincts In Real Moments" — three real game scenarios showing exactly how that archetype thinks (losing with 15 mins left, what kills their confidence, team frustration)
5. Player comparisons — three comps, cross-position, with specific justification tied to the archetype logic
6. Full archetype breakdown — all three archetypes explained, including the tertiary. Acknowledges when secondary and tertiary are close (50/25/25 type profiles flagged as a specific strength)
7. Development starting point — strength to protect, development challenge, what to watch
8. Email capture — soft, positioned as "save your report" not a gate

---

## Key Design Principles

**Identity first.** The report validates before it develops. A player's instincts are treated as strengths, not problems to fix. Every "weakness" is reframed as a misunderstood strength or the shadow side of their biggest asset.

**Position is irrelevant.** The comps cross positions deliberately — a Magician gets Cristián Romero (centre back) as a comp alongside Mbappé. This reinforces the core idea that identity has nothing to do with position.

**All three archetypes appear in every report.** Even 5% Warrior gets a paragraph. Because 5% Warrior still shows up in the game — it's emergency fuel, not absence.

**The tone is the most honest coach they've ever had.** Direct, specific, knowledgeable, slightly raw. Never generic. Never sanitised.

**Works for all ages.** A 9-year-old with a parent can complete it. A 17-year-old can complete it alone. A coach can complete it about a player.

---

## Technical Details

- Single HTML file — no dependencies, no backend required
- Fonts loaded from Google Fonts (Bebas Neue, DM Sans)
- Email capture via Formspree (endpoint: https://formspree.io/f/xlgokgql)
- AI scoring via Anthropic API (claude-sonnet-4-20250514) — API key placeholder at top of script
- Without API key: fallback keyword scoring runs automatically
- MC answer order randomised per session using Fisher-Yates shuffle
- 9 distinct profiles + 1 balanced profile, selected based on primary/secondary archetype percentages
- Dynamic tertiary archetype logic — report adjusts based on actual percentage split, not just rank order
- Player/Coach mode toggle on landing page — language adjusts throughout quiz

---

## The Nine Profiles

| Profile | Name | Tagline |
|---------|------|---------|
| MM | The Magician | You pursue the highest level moments the game will allow |
| MC | The Free Creator | You create with purpose. The art flows from the intelligence |
| MW | The Game Breaker | You don't play the game — you change it |
| CC | The Conductor | You control the game. The tempo belongs to you |
| CM | The Visionary | You see it first. Then you make it beautiful |
| CW | The Pitch General | You see it first. You step in first |
| WW | The Warrior | You impose yourself. The game feels your presence |
| WM | The Spark | You fight for the moment. Then you make it count |
| WC | The Enforcer | You win it. You protect it. You impose order |
| BAL | The All-Rounder | You can think it, feel it, and create it. Now pick a lane |

---

## What Good Looks Like

When the quiz is working at its best, a player reads their report and experiences three things in order:

1. **Recognition** — "That's exactly how I play. How does it know that?"
2. **Validation** — "The things I thought were problems are actually part of who I am."
3. **Direction** — "Now I know what to work on — and it makes sense for who I actually am."

The player comparisons are the moment most likely to produce recognition. The identity snapshot is the moment most likely to produce validation. The development section is the moment most likely to produce direction.

The game scenarios section ("Your Instincts In Real Moments") is often the most powerful — because it describes how the player already thinks in situations they've been in hundreds of times, and seeing it written down makes them feel properly seen for the first time.

---

## What To Improve / Known Issues

- Questions are still partially gameable by someone who has watched explainer videos about the archetypes — the belief statement format (rate 1-5) is harder to game than MC but not perfect
- Open-ended scoring is the most accurate part — longer answers produce better results
- The photo/image-based question format (showing a real game situation and asking what they'd do) is a planned V2 upgrade that would be significantly harder to game
- A simplified version for under-12s is planned as V2
- The quiz currently has no persistent data storage — each completion is independent

---

## Business Context

The quiz is free. It is the top of the funnel for:
- Paid full report ($27) — coming soon
- Personal archetype assessment call ($120-150) — Josh watches footage and gives development roadmap
- Skool community ($27-37/month) — primarily for parents
- Future courses and coaching products

Every quiz completion captures an email via Formspree. That email list is the primary business asset being built.

The primary audience is parents (revenue driver) and players/kids (virality and movement driver). The quiz serves both — player mode for players, coach/parent mode for adults completing it on behalf of a child.

---

*This context document is for use in Claude Code or any AI-assisted development environment working on the Archetypes quiz.*
