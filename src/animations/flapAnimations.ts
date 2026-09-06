import { EASE } from './easings';

export interface Flap {
  el: HTMLElement;
  /** Fully-open angle in degrees, including the direction of travel. */
  open: number;
  axis: 'rotateX' | 'rotateY';
  /** How far the flap overshoots before the paper springs back, in degrees. */
  overshoot: number;
  /**
   * A fraction of a pixel of forward lift. Its only job is to keep each flap
   * off the plane of the panel behind it: two coplanar surfaces in the same
   * 3D context are sorted unpredictably, which is how a flap ends up drawn
   * behind the envelope and looks as though it never opened.
   */
  lift: number;
}

/**
 * One flap turning on its fold. Two tweens rather than one: paper does not
 * arrive at a stop, it swings a little past and comes back. The `--shade`
 * custom property drives a gradient overlay so the face darkens as it turns
 * away from the light, which is what stops a flap reading as a flat polygon.
 */
export function addFlapOpen(
  tl: gsap.core.Timeline,
  { el, open, axis, overshoot, lift }: Flap,
  at: number,
  duration: number,
) {
  const dir = Math.sign(open);
  const swing = duration * 0.78;

  tl.set(el, { z: lift }, 0).to(
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
    )
    /* The specular sweep: up as the face turns through the light, away again
       once it has passed it. */
    .to(el, { '--gloss': 1, duration: duration * 0.42, ease: 'sine.inOut' }, at)
    .to(el, { '--gloss': 0, duration: duration * 0.62, ease: 'sine.inOut' }, at + duration * 0.42)
    /* Nothing stays promoted to its own layer once it has finished moving. */
    .set(el, { willChange: 'auto' }, at + duration + 0.5);

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
