import cover from './cover.webp';
import coverAvif from './cover.avif';
import couple from './couple.webp';
import coupleAvif from './couple.avif';
import envelope from './envelope.webp';
import envelopeAvif from './envelope.avif';
import table from './table.webp';
import tableAvif from './table.avif';

/**
 * The cover photograph. One picture: it is shown sharp for the moment the
 * camera arrives, then softened with a CSS blur rather than by swapping in a
 * second image, so there is nothing to load at the exact moment of the reveal.
 *
 * Every photograph comes in two encodings. AVIF is about a third smaller for
 * the same picture and is what nearly every current browser takes; WebP is
 * the fallback.
 */
export const photos = {
  cover,
  coverAvif,
  /** Bundled gallery plates, in the order of `wedding.gallery`. */
  gallery: [
    { webp: couple, avif: coupleAvif },
    { webp: envelope, avif: envelopeAvif },
    { webp: table, avif: tableAvif },
  ],
};
