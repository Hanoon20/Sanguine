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
 * line over it.
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

  tl.addLabel('sealRelease', 0.35);
  addSealRelease(tl, el, 0.35);

  /* Top and bottom go first, almost together. They are the two that cover the
     names, so opening them opens a band straight across the middle and the
     wording starts showing immediately. The sides follow and widen it. */
  tl.addLabel('topFlap', 0.55);
  addFlapOpen(tl, flap(el.flapTop, FLAP_ANGLES.top, 'rotateX', -7, 2), 0.55, 1.4);

  tl.addLabel('bottomFlap', 0.7);
  addFlapOpen(tl, flap(el.flapBottom, FLAP_ANGLES.bottom, 'rotateX', 6, 0.8), 0.7, 1.4);

  tl.to(el.shadow, { opacity: 0.2, duration: 1.3, ease: 'sine.out' }, 0.55);

  tl.addLabel('sideFlaps', 1.25);
  addSideFlaps(
    tl,
    flap(el.flapLeft, FLAP_ANGLES.left, 'rotateY', 6, 1.4),
    flap(el.flapRight, FLAP_ANGLES.right, 'rotateY', -6, 1.4),
    1.25,
    1.15,
    0.12,
  );

  tl.addLabel('light', 1.5);
  addGoldenLight(tl, el, 1.5);

  /* A drift under the opening, then a push that begins the moment the last
     flap settles. The two overlap by design — there is no beat between the
     envelope finishing and the camera leaving. */
  tl.addLabel('camera', 0.8);
  addCameraPush(tl, el, 0.8, {
    drift: 2.1,
    driftTo: 1.14,
    hold: 0.75,
    holdTo: 1.19,
    push: 1.3,
    pushTo: 2.9,
  });

  /* The glow steps back while the names are being read. */
  tl.to(el.light, { opacity: 0.62, duration: 0.7, ease: 'sine.inOut' }, 2.2)
    .to(el.light, { opacity: 1, duration: 0.8, ease: 'sine.inOut' }, 3.7);

  /* The contact shadow is taken all the way out rather than left at a low
     opacity: a blurred layer that is nearly invisible still costs the same to
     composite on every frame of the push. */
  tl.to(el.shadow, { opacity: 0, duration: 0.6, ease: 'sine.in' }, 2.6);

  tl.addLabel('photo', 4.55);
  addPhotoReveal(tl, el, 4.55);
  tl.call(() => onCardVisible?.(), undefined, 5.7);

  tl.addLabel('text', 6.2);
  addTextReveal(tl, el, 6.2);

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
