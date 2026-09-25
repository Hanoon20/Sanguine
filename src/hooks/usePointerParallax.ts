import { useEffect, type RefObject } from 'react';

interface Options {
  /** Largest travel in pixels, in either direction. */
  amount?: number;
  /** Largest tilt in degrees. */
  tilt?: number;
  enabled?: boolean;
}

/**
 * A very restrained pointer parallax for desktop: the envelope leans a few
 * pixels toward the cursor and no further. Skipped on touch and when disabled.
 */
export function usePointerParallax(
  ref: RefObject<HTMLElement | null>,
  { amount = 8, tilt = 3.5, enabled = true }: Options = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let frame = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    /* Runs only while the envelope is still catching up with the pointer,
       and goes quiet once it has settled, so an idle page costs nothing. */
    const loop = () => {
      x += (targetX - x) * 0.06;
      y += (targetY - y) * 0.06;
      el.style.setProperty('--px', `${(x * amount).toFixed(2)}px`);
      el.style.setProperty('--py', `${(y * amount).toFixed(2)}px`);
      el.style.setProperty('--rx', `${(-y * tilt).toFixed(2)}deg`);
      el.style.setProperty('--ry', `${(x * tilt).toFixed(2)}deg`);
      const settled = Math.abs(targetX - x) < 0.001 && Math.abs(targetY - y) < 0.001;
      frame = settled ? 0 : requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(frame);
    };
  }, [ref, amount, tilt, enabled]);
}
