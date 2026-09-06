import gsap from './easings';
import { addFlapOpen, addSideFlaps, type Flap } from './flapAnimations';
import {
  addCameraPush,
  addGoldenLight,
  addPhotoReveal,
  addSealActivation,
  addSealRelease,
  addTextReveal,
  type RevealElements,
} from './revealAnimations';

export interface EnvelopeElements extends RevealElements {
  flapTop: HTMLElement;
  flapLeft: HTMLElement;
  flapRight: HTMLElement;
  flapBottom: HTMLElement;
}

/**
 * Fully-open angles. The four flaps of a pocket envelope fold in to meet at
 * the centre, so each one turns backwards on its own outer edge.
 */
const FLAP_ANGLES = {
  top: -152,
  left: 150,
  right: -150,
  bottom: 154,
} as const;

export interface TimelineOptions {
  onComplete?: () => void;
  /** Fires once the page beneath is legible, so it can be handed over. */
  onCardVisible?: () => void;
}

/**
 * The complete opening. One continuous move: the seal gives, the four flaps
 * turn back, and the camera is already travelling inward before they finish.
 * The names are not animated in. They are printed on the pocket from the
 * start, sitting behind the flaps, and are uncovered as the paper turns away.
 *
 * The photograph then opens out of the point the camera is heading for, holds
 * sharp for a beat, and falls out of focus as the wording arrives line by
 * line over it. Around three and a half seconds from thumb to photograph.
 *
 * Labels mark each phase so any part can be scrubbed while tuning.
 */
export function createEnvelopeOpeningTimeline(
  el: EnvelopeElements,
  { onComplete, onCardVisible }: TimelineOptions = {},
): gsap.core.Timeline {
  const tl = gsap.timeline({
    paused: true,
    defaults: { force3D: true },
    onComplete,
  });

  const flap = (
    element: HTMLElement,
    open: number,
    axis: Flap['axis'],
    overshoot: number,
    lift: number,
  ): Flap => ({ el: element, open, axis, overshoot, lift });

  /* Everything the page will reveal later is put out of sight before the
     first frame, so nothing flashes when the photograph is switched on. */
  tl.set(el.heroItems, { opacity: 0, y: 18 }, 0).set(el.scrim, { opacity: 0 }, 0);

  tl.addLabel('seal', 0);
  addSealActivation(tl, el, 0);

  tl.addLabel('sealRelease', 0.28);
  addSealRelease(tl, el, 0.28);

  /* Top and bottom first, almost together. They are the two that cover the
     names, so opening them clears a band straight across the middle and the
     wording starts showing at once. The sides follow and widen it.

     Every phase overlaps the one before it. Nothing in this sequence waits
     for anything else to finish. */
  tl.addLabel('topFlap', 0.42);
  addFlapOpen(tl, flap(el.flapTop, FLAP_ANGLES.top, 'rotateX', -7, 2), 0.42, 1.05);

  tl.addLabel('bottomFlap', 0.52);
  addFlapOpen(tl, flap(el.flapBottom, FLAP_ANGLES.bottom, 'rotateX', 6, 0.8), 0.52, 1.05);

  tl.to(el.shadow, { opacity: 0.2, duration: 0.9, ease: 'sine.out' }, 0.42);

  tl.addLabel('sideFlaps', 0.85);
  addSideFlaps(
    tl,
    flap(el.flapLeft, FLAP_ANGLES.left, 'rotateY', 6, 1.4),
    flap(el.flapRight, FLAP_ANGLES.right, 'rotateY', -6, 1.4),
    0.85,
    0.9,
    0.09,
  );

  tl.addLabel('light', 1.05);
  addGoldenLight(tl, el, 1.05);

  /* A drift under the opening, then the push, which begins as the last flap
     settles. `hold` is a knob rather than a beat: raise it to pause on the
     open envelope before leaving it. */
  tl.addLabel('camera', 0.6);
  addCameraPush(tl, el, 0.6, {
    drift: 1.45,
    driftTo: 1.12,
    hold: 0.1,
    holdTo: 1.13,
    push: 1.1,
    pushTo: 2.9,
  });

  tl.to(el.light, { opacity: 0.62, duration: 0.5, ease: 'sine.inOut' }, 1.5)
    .to(el.light, { opacity: 1, duration: 0.6, ease: 'sine.inOut' }, 2.05);

  tl.to(el.shadow, { opacity: 0, duration: 0.5, ease: 'sine.in' }, 1.7);

  tl.addLabel('photo', 2.2);
  addPhotoReveal(tl, el, 2.2);
  tl.call(() => onCardVisible?.(), undefined, 3.7);

  tl.addLabel('text', 3.95);
  addTextReveal(tl, el, 3.95);

  return tl;
}

/**
 * The reduced-motion path. Nothing turns, nothing travels: the envelope steps
 * aside and the invitation is simply there.
 */
export function createReducedMotionTimeline(
  el: EnvelopeElements,
  { onComplete, onCardVisible }: TimelineOptions = {},
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, onComplete });

  tl.set(el.backdrop, { '--reveal': '155%', scale: 1, filter: 'blur(10px)', opacity: 1 })
    .set(el.scrim, { opacity: 1 })
    .set(el.heroItems, { opacity: 1, y: 0, filter: 'none' })
    .to([el.hint, el.overline, el.envelope, el.shadow], { opacity: 0, duration: 0.4, ease: 'none' }, 0)
    .to(el.atmosphere, { '--dawn': 1, '--warmth': 1, duration: 0.5, ease: 'none' }, 0)
    .to(el.site, { opacity: 1, duration: 0.45, ease: 'none' }, 0.15)
    .call(() => onCardVisible?.(), undefined, 0.5)
    .to(el.scene, { opacity: 0, duration: 0.3, ease: 'none' }, 0.6)
    .set(el.scene, { display: 'none' });

  return tl;
}

/**
 * A near-imperceptible idle on the closed seal: a breath of scale and a slow
 * travelling highlight. Returned so the caller can kill it on the first tap —
 * nothing should still be looping once the opening starts.
 */
export function createSealIdle(sealBody: HTMLElement): gsap.core.Timeline {
  const tl = gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'sine.inOut' } });
  tl.to(sealBody, { '--idle': 1, duration: 3.2 }, 0).to(
    sealBody,
    { '--wax-sweep': 1, duration: 4.6 },
    0,
  );
  return tl;
}
