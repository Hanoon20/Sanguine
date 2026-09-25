import cover from './hero.webp';
import coverAvif from './hero.avif';

/**
 * The cover photograph. One picture: it is shown sharp for the moment the
 * camera arrives, then softened with a CSS blur rather than by swapping in a
 * second image, so there is nothing to load at the exact moment of the reveal.
 *
 * Two encodings of it. AVIF is about a third smaller for the same picture and
 * is what nearly every current browser takes; WebP is the fallback.
 */
export const photos = { cover, coverAvif };
