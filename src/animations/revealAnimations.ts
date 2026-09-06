import { EASE } from './easings';

export interface RevealElements {
  seal: HTMLElement;
  sealBody: HTMLElement;
  sealGlow: HTMLElement;
  shards: HTMLElement[];
  light: HTMLElement;
  lightCore: HTMLElement;
  card: HTMLElement;
  cardFace: HTMLElement;
  cardShadow: HTMLElement;
  scene: HTMLElement;
  envelope: HTMLElement;
  shadow: HTMLElement;
  hint: HTMLElement;
  site: HTMLElement;
  atmosphere: HTMLElement;
}

/** Phase 1 — the wax takes the pressure of a thumb before it gives. */
export function addSealActivation(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.to(e.hint, { opacity: 0, y: 8, duration: 0.3, ease: 'power2.out' }, at)
    .to(
      e.sealBody,
      { scale: 1.075, rotate: -2.2, duration: 0.3, ease: EASE.wax },
      at,
    )
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
      {
        x: s.x,
        y: s.y,
        rotate: s.r,
        z: 18 + i * 6,
        opacity: 0,
        duration: 0.62,
        ease: 'power2.out',
      },
      at + i * 0.03,
    );
  });

  tl.to(
    e.sealBody,
    { scale: 0.86, opacity: 0, duration: 0.42, ease: 'power2.in' },
    at + 0.06,
  )
    .to(e.sealGlow, { opacity: 0, scale: 2.1, duration: 0.5, ease: 'power2.out' }, at + 0.1)
    .set(e.seal, { pointerEvents: 'none' }, at + 0.5)
    .to(e.lightCore, { opacity: 0.28, scale: 0.55, duration: 0.4, ease: 'sine.out' }, at + 0.08);

  return tl;
}

/** Phase 6 — warm light from inside the pocket, built from stacked gradients. */
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

/** Phase 7 — the card is drawn up out of the pocket, on a hand's timing. */
export function addInvitationReveal(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.set(e.card, { visibility: 'visible' }, at)
    .fromTo(
      e.card,
      { opacity: 0, y: 40, z: -10, scale: 0.92, rotateZ: -1.4, rotateX: 5 },
      {
        opacity: 1,
        y: -10,
        z: 70,
        scale: 1,
        rotateZ: 0,
        rotateX: 0,
        duration: 1.5,
        ease: EASE.lift,
      },
      at,
    )
    .fromTo(
      e.cardShadow,
      { opacity: 0, scaleX: 0.6, scaleY: 0.5 },
      { opacity: 0.55, scaleX: 1, scaleY: 1, duration: 1.4, ease: 'power2.out' },
      at + 0.05,
    )
    .fromTo(
      e.cardFace.querySelectorAll<HTMLElement>('[data-stagger]'),
      { opacity: 0, y: 12 },
      { opacity: 1, y: 0, duration: 0.85, stagger: 0.11, ease: 'power2.out' },
      at + 0.55,
    )
    .to(e.light, { opacity: 0.6, scale: 1.4, duration: 1.1, ease: 'sine.inOut' }, at + 0.7);
  return tl;
}

/** Phase 8 — the card becomes the page. No cut: the two worlds cross over. */
export function addHeroTakeover(tl: gsap.core.Timeline, e: RevealElements, at: number) {
  tl.to(e.card, { scale: 0.85, duration: 0.5, ease: 'power2.inOut' }, at)
    .to(e.card, { scale: 1.0, duration: 0.55, ease: 'power1.inOut' }, at + 0.5)
    .to(e.card, { scale: 1.08, y: -26, duration: 0.95, ease: EASE.takeover }, at + 1.0)
    .to(e.envelope, { opacity: 0, y: 34, duration: 1.1, ease: 'power2.in' }, at + 0.35)
    .to(e.shadow, { opacity: 0, scaleX: 0.7, duration: 1.0, ease: 'power2.in' }, at + 0.35)
    .to(e.light, { opacity: 0, duration: 1.0, ease: 'power2.in' }, at + 0.55)
    .to(e.atmosphere, { '--dawn': 1, duration: 1.6, ease: 'sine.inOut' }, at + 0.3)
    .to(e.site, { opacity: 1, duration: 1.1, ease: 'sine.inOut' }, at + 0.75)
    .to(e.card, { opacity: 0, duration: 0.55, ease: 'sine.inOut' }, at + 1.45)
    .to(e.scene, { opacity: 0, duration: 0.5, ease: 'sine.inOut' }, at + 1.5)
    .set(e.scene, { display: 'none' })
    .set([e.light, e.card], { willChange: 'auto' });
  return tl;
}
