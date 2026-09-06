import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';

gsap.registerPlugin(CustomEase);

/**
 * Named curves for the opening. They are registered once so every module can
 * refer to them by string, and so the timing can be tuned in one place.
 *
 * paper   — a fold cracking open: hesitant for the first frames, then it goes.
 * settle  — the small weighted stop of card stock coming to rest.
 * lift    — a card being drawn upward by hand, slow at both ends.
 * takeover— the long push into the hero, never quite reaching a constant speed.
 * dolly   — the camera travelling into the open envelope.
 */
export const EASE = {
  paper: 'envPaper',
  settle: 'envSettle',
  lift: 'envLift',
  takeover: 'envTakeover',
  wax: 'envWax',
  dolly: 'envDolly',
} as const;

let registered = false;

export function registerEases() {
  if (registered) return;
  registered = true;

  CustomEase.create(EASE.paper, 'M0,0 C0.12,0 0.16,0.06 0.26,0.28 0.38,0.56 0.56,0.94 0.72,0.99 0.83,1.02 0.9,1 1,1');
  CustomEase.create(EASE.settle, 'M0,0 C0.2,0 0.3,1.04 0.52,1.02 0.7,1.005 0.84,1 1,1');
  CustomEase.create(EASE.lift, 'M0,0 C0.16,0 0.2,0.32 0.34,0.62 0.48,0.9 0.66,1 1,1');
  CustomEase.create(EASE.takeover, 'M0,0 C0.22,0 0.24,0.24 0.4,0.56 0.56,0.88 0.72,1 1,1');
  CustomEase.create(EASE.wax, 'M0,0 C0.1,0 0.1,1.12 0.36,1.06 0.58,1.01 0.78,1 1,1');
  /* dolly — barely moves for the first half second, then keeps gathering
     pace all the way out. A camera being pushed, not an ease-out. */
  CustomEase.create(EASE.dolly, 'M0,0 C0.32,0.008 0.56,0.09 0.74,0.26 0.87,0.42 0.95,0.68 1,1');
}

registerEases();

export default gsap;
