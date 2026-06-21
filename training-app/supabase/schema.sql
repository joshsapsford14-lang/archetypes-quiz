-- Touchline — Supabase schema (BASE BETA)
-- NOTE: This schema is provided so the backend is ready to go, but the app is
-- NOT wired to Supabase yet. It runs entirely on local mock data until the
-- experience is approved. Apply this in the Supabase SQL editor when ready.

-- ---------------------------------------------------------------------------
-- profiles: one row per auth user
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  username     text unique not null,
  display_name text not null,
  avatar_color text not null default '#D4FF3D',
  created_at   timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- sessions: every logged training session (XP/grade computed client-side for
-- the beta; can move to a server-side function later)
-- ---------------------------------------------------------------------------
create table if not exists public.sessions (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.profiles (id) on delete cascade,
  type_id      text not null,
  duration_min integer not null check (duration_min > 0 and duration_min <= 600),
  intensity    text not null check (intensity in ('easy', 'moderate', 'hard')),
  is_extra     boolean not null default false,
  xp           integer not null check (xp >= 0),
  grade        text not null check (grade in ('S', 'A', 'B', 'C')),
  stars        integer not null check (stars between 1 and 5),
  created_at   timestamptz not null default now()
);
create index if not exists sessions_user_created_idx
  on public.sessions (user_id, created_at desc);

-- ---------------------------------------------------------------------------
-- friendships: simple mutual-follow model (one row per direction)
-- ---------------------------------------------------------------------------
create table if not exists public.friendships (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  friend_id  uuid not null references public.profiles (id) on delete cascade,
  status     text not null default 'accepted' check (status in ('pending', 'accepted')),
  created_at timestamptz not null default now(),
  primary key (user_id, friend_id)
);

-- ---------------------------------------------------------------------------
-- kudos: a reaction on a session (one per user per session)
-- ---------------------------------------------------------------------------
create table if not exists public.kudos (
  user_id    uuid not null references public.profiles (id) on delete cascade,
  session_id uuid not null references public.sessions (id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (user_id, session_id)
);

-- ---------------------------------------------------------------------------
-- weekly_leaderboard: XP per user for the current (Monday-start) week
-- ---------------------------------------------------------------------------
create or replace view public.weekly_leaderboard as
select
  p.id,
  p.display_name,
  p.avatar_color,
  coalesce(sum(s.xp), 0) as weekly_xp,
  count(s.id)            as weekly_sessions
from public.profiles p
left join public.sessions s
  on s.user_id = p.id
 and s.created_at >= date_trunc('week', now())
group by p.id, p.display_name, p.avatar_color;

-- ---------------------------------------------------------------------------
-- Row Level Security (starter policies — tighten before production)
-- ---------------------------------------------------------------------------
alter table public.profiles    enable row level security;
alter table public.sessions    enable row level security;
alter table public.friendships enable row level security;
alter table public.kudos       enable row level security;

-- Profiles: anyone signed in can read; you can only edit your own.
create policy "profiles_read"   on public.profiles for select using (auth.role() = 'authenticated');
create policy "profiles_update" on public.profiles for update using (auth.uid() = id);
create policy "profiles_insert" on public.profiles for insert with check (auth.uid() = id);

-- Sessions: you manage your own; friends can read yours.
create policy "sessions_owner" on public.sessions for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "sessions_friends_read" on public.sessions for select using (
  exists (
    select 1 from public.friendships f
    where f.friend_id = auth.uid() and f.user_id = sessions.user_id and f.status = 'accepted'
  )
);

-- Friendships + kudos: you manage rows that belong to you.
create policy "friendships_owner" on public.friendships for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "kudos_owner" on public.kudos for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
