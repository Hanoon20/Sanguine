import gsap from './easings';
import { addFlapOpen, addSideFlaps, type Flap } from './flapAnimations';
import {
  addGoldenLight,
  addHeroTakeover,
  addInvitationReveal,
  addSealActivation,
  addSealRelease,
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
  bottom: 150,
} as const;

export interface TimelineOptions {
  onComplete?: () => void;
  /** Fires the moment the card is legible, so the page can be handed over. */
  onCardVisible?: () => void;
}

/**
 * The complete opening: one timeline, played once, roughly five and a half
 * seconds from thumb to hero. Labels mark each phase so the sequence can be
 * scrubbed or restarted from any point during tuning.
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

  const flap = (element: HTMLElement, open: number, axis: Flap['axis'], overshoot: number): Flap => ({
    el: element,
    open,
    axis,
    overshoot,
  });

  tl.addLabel('seal', 0);
  addSealActivation(tl, el, 0);

  tl.addLabel('sealRelease', 0.35);
  addSealRelease(tl, el, 0.35);

  tl.addLabel('topFlap', 0.55);
  addFlapOpen(tl, flap(el.flapTop, FLAP_ANGLES.top, 'rotateX', -7), 0.55, 1.0);

  tl.addLabel('sideFlaps', 1.1);
  addSideFlaps(
    tl,
    flap(el.flapLeft, FLAP_ANGLES.left, 'rotateY', 6),
    flap(el.flapRight, FLAP_ANGLES.right, 'rotateY', -6),
    1.1,
    0.9,
    0.1,
  );

  tl.addLabel('bottomFlap', 1.45);
  addFlapOpen(tl, flap(el.flapBottom, FLAP_ANGLES.bottom, 'rotateX', 5), 1.45, 0.85);

  tl.addLabel('light', 1.5);
  addGoldenLight(tl, el, 1.5);

  tl.addLabel('invitation', 2.1);
  addInvitationReveal(tl, el, 2.1);
  tl.call(() => onCardVisible?.(), undefined, 3.1);

  tl.addLabel('takeover', 3.5);
  addHeroTakeover(tl, el, 3.5);

  return tl;
}

/**
 * The reduced-motion path. Nothing turns, nothing rises: the envelope steps
 * aside and the invitation is simply there.
 */
export function createReducedMotionTimeline(
  el: EnvelopeElements,
  { onComplete, onCardVisible }: TimelineOptions = {},
): gsap.core.Timeline {
  const tl = gsap.timeline({ paused: true, onComplete });

  tl.set(el.card, { visibility: 'visible' })
    .to([el.hint, el.envelope, el.shadow], { opacity: 0, duration: 0.4, ease: 'none' }, 0)
    .to(el.atmosphere, { '--dawn': 1, '--warmth': 1, duration: 0.5, ease: 'none' }, 0)
    .fromTo(el.card, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'none' }, 0.2)
    .call(() => onCardVisible?.(), undefined, 0.4)
    .to(el.site, { opacity: 1, duration: 0.4, ease: 'none' }, 0.5)
    .to([el.card, el.scene], { opacity: 0, duration: 0.3, ease: 'none' }, 0.8)
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
