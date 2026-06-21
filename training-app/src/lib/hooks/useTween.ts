import { useEffect, useRef, useState } from "react";

import { useReducedMotion } from "./useReducedMotion";

export interface TweenOptions {
  durationMs?: number;
  start?: boolean; // gate the animation
  delayMs?: number;
  from?: number;
}

/**
 * Tweens a float from `from` (default 0) to `target` with an ease-out curve,
 * driven by requestAnimationFrame. Respects reduced-motion (jumps to target).
 * The shared engine behind the XP count-up and the progress ring/bars.
 */
export function useTween(target: number, options: TweenOptions = {}): number {
  const { durationMs = 1000, start = true, delayMs = 0, from = 0 } = options;
  const reduced = useReducedMotion();
  const [value, setValue] = useState(from);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!start) return;
    if (reduced || durationMs <= 0) {
      setValue(target);
      return;
    }

    let startTs: number | null = null;
    const tick = (ts: number) => {
      if (startTs === null) startTs = ts + delayMs;
      const elapsed = ts - startTs;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / durationMs, 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(from + (target - from) * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, durationMs, start, delayMs, reduced]);

  return value;
}
