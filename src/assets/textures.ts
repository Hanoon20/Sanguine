/**
 * Textures are generated as inline SVG so the opening scene needs no network
 * request and no image decode before the first paint.
 */

const uri = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg.replace(/\s+/g, ' ').trim())}")`;

/** Fine paper grain. Sits over the burgundy stock at low opacity. */
export const grain = uri(`
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180">
  <filter id="g">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="180" height="180" filter="url(#g)" opacity="0.5"/>
</svg>`);

/** Coarser fibre, used sparingly on the ivory card stock. */
export const fibre = uri(`
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="240">
  <filter id="f">
    <feTurbulence type="fractalNoise" baseFrequency="0.012 0.42" numOctaves="2" stitchTiles="stitch"/>
    <feColorMatrix type="saturate" values="0"/>
  </filter>
  <rect width="240" height="240" filter="url(#f)" opacity="0.55"/>
</svg>`);

/**
 * A tileable vine-and-bud motif drawn as thin strokes. Two copies of this,
 * one light and one dark, offset by a pixel, read as a blind emboss.
 */
const floralPath = `
  <g fill="none" stroke="COLOR" stroke-width="1.1" stroke-linecap="round">
    <path d="M0 60 C 30 20, 60 100, 90 60 S 150 20, 180 60"/>
    <path d="M60 60 C 56 44, 44 40, 38 46 C 46 56, 56 58, 60 60Z"/>
    <path d="M60 60 C 64 76, 76 80, 82 74 C 74 64, 64 62, 60 60Z"/>
    <path d="M120 60 C 116 44, 104 40, 98 46 C 106 56, 116 58, 120 60Z"/>
    <path d="M0 150 C 30 110, 60 190, 90 150 S 150 110, 180 150"/>
    <path d="M30 150 C 26 134, 14 130, 8 136 C 16 146, 26 148, 30 150Z"/>
    <path d="M150 150 C 146 134, 134 130, 128 136 C 136 146, 146 148, 150 150Z"/>
    <path d="M90 150 C 94 166, 106 170, 112 164 C 104 154, 94 152, 90 150Z"/>
    <circle cx="30" cy="34" r="2.4"/><circle cx="150" cy="34" r="2.4"/>
    <circle cx="90" cy="124" r="2.4"/>
    <path d="M90 14 l0 -12 M84 6 l6 -6 6 6"/>
    <path d="M0 104 l0 -10 M174 104 l0 -10"/>
  </g>`;

const floralTile = (color: string, opacity: number) => uri(`
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180" opacity="${opacity}">
  ${floralPath.replace(/COLOR/g, color)}
</svg>`);

export const floralLight = floralTile('%23ffe9c9', 0.5);
export const floralDark = floralTile('%23120207', 0.55);

/** Slim engraved rule used inside the wax seal and on the card border. */
export const crest = uri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <g fill="none" stroke="%23c8a052" stroke-width="1.2" stroke-linecap="round">
    <path d="M60 12 C 42 30, 42 52, 60 66 C 78 52, 78 30, 60 12Z"/>
    <path d="M60 66 L60 108"/>
    <path d="M60 78 C 46 74, 36 82, 34 92 C 48 96, 58 90, 60 78Z"/>
    <path d="M60 78 C 74 74, 84 82, 86 92 C 72 96, 62 90, 60 78Z"/>
    <path d="M44 108 L76 108"/>
  </g>
</svg>`);
