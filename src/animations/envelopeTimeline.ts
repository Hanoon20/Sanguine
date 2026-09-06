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

  /* The flaps take their time. Each one is a slow, weighted turn, and the
     names printed on the pocket are uncovered a little more with every one
     of them — that uncovering is the reveal, so it cannot be rushed. */
  tl.addLabel('topFlap', 0.55);
  addFlapOpen(tl, flap(el.flapTop, FLAP_ANGLES.top, 'rotateX', -7, 2), 0.55, 1.5);

  tl.to(el.shadow, { opacity: 0.16, duration: 1.4, ease: 'sine.out' }, 0.55);

  tl.addLabel('sideFlaps', 1.25);
  addSideFlaps(
    tl,
    flap(el.flapLeft, FLAP_ANGLES.left, 'rotateY', 6, 1.4),
    flap(el.flapRight, FLAP_ANGLES.right, 'rotateY', -6, 1.4),
    1.25,
    1.4,
    0.12,
  );

  tl.addLabel('bottomFlap', 1.7);
  addFlapOpen(tl, flap(el.flapBottom, FLAP_ANGLES.bottom, 'rotateX', 6, 0.8), 1.7, 1.5);

  tl.addLabel('light', 1.6);
  addGoldenLight(tl, el, 1.6);

  /* A drift under the opening, then a quick push once it is done. */
  tl.addLabel('camera', 0.8);
  addCameraPush(tl, el, 0.8, { drift: 2.5, driftTo: 1.16, push: 1.6, pushTo: 2.95 });

  /* The glow steps back while the names are being read. */
  tl.to(el.light, { opacity: 0.6, duration: 0.8, ease: 'sine.inOut' }, 2.4)
    .to(el.light, { opacity: 1, duration: 0.8, ease: 'sine.inOut' }, 4.2);

  tl.addLabel('photo', 4.6);
  addPhotoReveal(tl, el, 4.6);
  tl.call(() => onCardVisible?.(), undefined, 6.3);

  tl.addLabel('text', 6.5);
  addTextReveal(tl, el, 6.5);

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
