import { EASE } from './easings';

export interface Flap {
  el: HTMLElement;
  /** Fully-open angle in degrees, including the direction of travel. */
  open: number;
  axis: 'rotateX' | 'rotateY';
  /** How far the flap overshoots before the paper springs back, in degrees. */
  overshoot: number;
}

/**
 * One flap turning on its fold. Two tweens rather than one: paper does not
 * arrive at a stop, it swings a little past and comes back. The `--shade`
 * custom property drives a gradient overlay so the face darkens as it turns
 * away from the light, which is what stops a flap reading as a flat polygon.
 */
export function addFlapOpen(
  tl: gsap.core.Timeline,
  { el, open, axis, overshoot }: Flap,
  at: number | string,
  duration: number,
) {
  const dir = Math.sign(open);
  const swing = duration * 0.78;

  tl.to(
    el,
    {
      [axis]: open + overshoot * dir,
      duration: swing,
      ease: EASE.paper,
    },
    at,
  )
    .to(
      el,
      {
        [axis]: open,
        duration: duration - swing + 0.34,
        ease: EASE.settle,
      },
      `>-0.02`,
    )
    .to(
      el,
      {
        '--shade': 1,
        '--fold': 1,
        duration: duration * 0.9,
        ease: 'sine.inOut',
      },
      at,
    );

  return tl;
}

/**
 * The side flaps are deliberately not synchronised. A stagger of roughly a
 * tenth of a second is enough to read as two separate pieces of paper without
 * looking like a mistake.
 */
export function addSideFlaps(
  tl: gsap.core.Timeline,
  left: Flap,
  right: Flap,
  at: number,
  duration: number,
  stagger = 0.09,
) {
  addFlapOpen(tl, right, at, duration);
  addFlapOpen(tl, left, at + stagger, duration + 0.05);
  return tl;
}
