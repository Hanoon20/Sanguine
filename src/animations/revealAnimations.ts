import { EASE } from './easings';

export interface RevealElements {
  seal: HTMLElement;
  sealBody: HTMLElement;
  sealGlow: HTMLElement;
  shards: HTMLElement[];
  light: HTMLElement;
  lightCore: HTMLElement;
  scene: HTMLElement;
  /** The wrapper the dolly acts on. Kept apart from the parallax transform. */
  camera: HTMLElement;
  envelope: HTMLElement;
  shadow: HTMLElement;
  hint: HTMLElement;
  site: HTMLElement;
  atmosphere: HTMLElement;
  /** The cover photograph behind the hero. */
  backdrop: HTMLElement;
  /** The warm shade that makes the type readable over the photograph. */
  scrim: HTMLElement;
  /** Every line of the hero, in the order it should arrive. */
  heroItems: HTMLElement[];
}

/** Phase 1 — the wax takes the pressure of a thumb before it gives. */
export function addSealActivation(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.to(e.hint, { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' }, at)
    .to(e.sealBody, { scale: 1.075, rotate: -2.2, duration: 0.3, ease: EASE.wax }, at)
    .to(e.sealGlow, { opacity: 0.85, scale: 1.5, duration: 0.45, ease: 'power2.out' }, at)
    .to(e.sealBody, { '--wax-lit': 1, duration: 0.35, ease: 'sine.out' }, at);
  return tl;
}

/** Phase 2 — the seal splits. The shards carry their own weight and spin. */
export function addSealRelease(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  const spread = [
    { x: -34, y: -16, r: -26 },
    { x: 30, y: -22, r: 20 },
    { x: -22, y: 26, r: 18 },
    { x: 26, y: 24, r: -14 },
  ];

  e.shards.forEach((shard, i) => {
    const s = spread[i % spread.length];
    tl.to(
      shard,
      { x: s.x, y: s.y, rotate: s.r, z: 18 + i * 6, opacity: 0, duration: 0.62, ease: 'power2.out' },
      at + i * 0.03,
    );
  });

  tl.to(e.sealBody, { scale: 0.86, opacity: 0, duration: 0.42, ease: 'power2.in' }, at + 0.06)
    .to(e.sealGlow, { opacity: 0, scale: 2.1, duration: 0.5, ease: 'power2.out' }, at + 0.1)
    .set(e.seal, { pointerEvents: 'none' }, at + 0.5)
    .to(e.lightCore, { opacity: 0.28, scale: 0.55, duration: 0.4, ease: 'sine.out' }, at + 0.08);

  return tl;
}

/**
 * The dolly. It starts while the flaps are still turning and never stops, so
 * the opening and the move inward are one continuous gesture rather than two
 * steps. Slow at the front, and it keeps gathering pace to the end — a camera
 * being pushed, not a scale being animated.
 */
export function addCameraPush(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.set(e.camera, { willChange: 'transform' }, at).to(
    e.camera,
    { scale: 2.85, duration: 4.1, ease: EASE.dolly },
    at,
  );
  return tl;
}

/** Warm light out of the open pocket, built from stacked radial gradients. */
export function addGoldenLight(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.set(e.light, { willChange: 'filter, opacity, transform' }, at)
    .fromTo(
      e.light,
      { opacity: 0, scale: 0.4, filter: 'blur(20px)' },
      { opacity: 1, scale: 1.25, filter: 'blur(60px)', duration: 1.2, ease: 'power2.out' },
      at,
    )
    .to(e.lightCore, { opacity: 1, scale: 1.1, duration: 0.9, ease: 'power2.out' }, at + 0.1)
    .to(e.envelope, { '--inner-glow': 1, duration: 0.9, ease: 'sine.out' }, at + 0.05)
    .to(e.atmosphere, { '--warmth': 1, duration: 1.6, ease: 'sine.inOut' }, at + 0.1);
  return tl;
}

/**
 * The photograph. It opens out of the exact point the camera is travelling
 * toward — a circular mask growing from the centre — so the picture reads as
 * something that was inside the envelope rather than a new screen behind it.
 * It arrives sharp, and only then settles back out of focus.
 */
export function addPhotoReveal(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.set(e.backdrop, { willChange: 'transform, filter' }, at)
    .set(e.scrim, { opacity: 0 }, at)
    .set(e.site, { opacity: 1 }, at)
    .fromTo(
      e.backdrop,
      { '--reveal': '0%', scale: 1.3, filter: 'blur(0px)', opacity: 0.85 },
      { '--reveal': '155%', scale: 1.12, opacity: 1, duration: 1.5, ease: 'power2.out' },
      at,
    )

    /* The envelope is given up while the picture is still opening, so the two
       overlap and there is no frame where either is alone. */
    .to(e.envelope, { opacity: 0, duration: 1.2, ease: 'power2.inOut' }, at + 0.75)
    .to(e.shadow, { opacity: 0, duration: 0.8, ease: 'power2.in' }, at + 0.75)
    .to(e.light, { opacity: 0, duration: 1.0, ease: 'power2.in' }, at + 1.0)
    .to(e.atmosphere, { '--dawn': 1, duration: 1.6, ease: 'sine.inOut' }, at + 0.9)

    /* Held sharp for a beat, then let go out of focus as the shade comes up
       and the reading begins. */
    .to(e.backdrop, { filter: 'blur(10px)', scale: 1, duration: 1.5, ease: 'sine.inOut' }, at + 1.2)
    .fromTo(e.scrim, { opacity: 0 }, { opacity: 1, duration: 1.4, ease: 'sine.inOut' }, at + 1.25)
    .to(e.scene, { opacity: 0, duration: 0.7, ease: 'sine.inOut' }, at + 1.35)
    .set(e.scene, { display: 'none' })
    .set([e.camera, e.backdrop], { willChange: 'auto' });

  return tl;
}

/**
 * The wording, one line at a time, unhurried. The page is already legible
 * as a photograph by this point, so the reading is allowed to take as long as
 * it wants — nothing is being waited on.
 */
export function addTextReveal(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  const names = e.heroItems.find((el) => el.classList.contains('hero__names'));

  /* Long tweens, well separated. Each line has finished most of its travel
     before the next one starts, so they are read one at a time rather than
     arriving as a group. */
  tl.fromTo(
    e.heroItems,
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 1.5, stagger: 0.36, ease: 'power3.out' },
    at,
  );

  /* One focus pull, on the one line that deserves it. Blurring every line
     would cost far more than it is worth on a mid-range phone. */
  if (names) {
    tl.fromTo(
      names,
      { filter: 'blur(9px)' },
      { filter: 'blur(0px)', duration: 1.9, ease: 'power3.out', clearProps: 'filter' },
      at + 0.36,
    );
  }

  return tl;
}
