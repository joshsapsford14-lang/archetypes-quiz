// Small date helpers. Week starts Monday (NZ convention for training weeks).

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}

export function sameDay(a: Date, b: Date): boolean {
  return startOfDay(a).getTime() === startOfDay(b).getTime();
}

export function isToday(iso: string): boolean {
  return sameDay(new Date(iso), new Date());
}

/** Monday 00:00 of the week containing `d`. */
export function startOfWeek(d: Date): Date {
  const x = startOfDay(d);
  const dayFromMonday = (x.getDay() + 6) % 7; // Sun=6 ... Mon=0
  return addDays(x, -dayFromMonday);
}

export function isThisWeek(iso: string, now: Date = new Date()): boolean {
  const start = startOfWeek(now);
  const t = new Date(iso);
  return t >= start && t < addDays(start, 7);
}

/** "just now" / "45m ago" / "yesterday" / "3d ago". */
export function relativeLabel(iso: string): string {
  const mins = Math.floor((Date.now() - new Date(iso).getTime()) / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "yesterday";
  if (days < 7) return `${days}d ago`;
  return `${Math.floor(days / 7)}w ago`;
}
