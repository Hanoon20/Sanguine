import { useEffect, type RefObject } from 'react';

/**
 * Section-by-section arrival on scroll.
 *
 * An IntersectionObserver rather than a scroll listener or a scroll plugin:
 * nothing runs between frames, nothing hooks the scroller, and there is no
 * way for it to interfere with the page's own scrolling.
 *
 * Elements are only hidden once the observer is actually running — the flag
 * goes on the root, and the CSS keys off it. If the script never runs, the
 * whole page is simply visible.
 */
export function useScrollReveal(root: RefObject<HTMLElement>, enabled = true) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    const targets = Array.from(el.querySelectorAll<HTMLElement>('[data-scroll]'));
    if (targets.length === 0) return;

    if (!enabled || typeof IntersectionObserver === 'undefined') {
      targets.forEach((t) => t.classList.add('is-visible'));
      return;
    }

    el.dataset.scrollReady = 'true';

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          /* Once a thing has arrived it stays arrived. */
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [root, enabled]);
}
