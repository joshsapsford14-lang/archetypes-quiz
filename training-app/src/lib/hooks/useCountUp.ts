import { useTween, type TweenOptions } from "./useTween";

/**
 * Integer count-up — the satisfying XP number ticking up in the reward moment.
 * Built on useTween, so it respects reduced-motion for free.
 */
export function useCountUp(target: number, options: TweenOptions = {}): number {
  return Math.round(useTween(target, options));
}
