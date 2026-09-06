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

export const floralLight = floralTile('#ffe9c9', 0.5);
export const floralDark = floralTile('#120207', 0.55);

/** Slim engraved rule used inside the wax seal and on the card border. */
export const crest = uri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <g fill="none" stroke="#c8a052" stroke-width="1.2" stroke-linecap="round">
    <path d="M60 12 C 42 30, 42 52, 60 66 C 78 52, 78 30, 60 12Z"/>
    <path d="M60 66 L60 108"/>
    <path d="M60 78 C 46 74, 36 82, 34 92 C 48 96, 58 90, 60 78Z"/>
    <path d="M60 78 C 74 74, 84 82, 86 92 C 72 96, 62 90, 60 78Z"/>
    <path d="M44 108 L76 108"/>
  </g>
</svg>`);

/* --------------------------------------------------------------------- */
/* Floral corner sprig                                                    */
/*                                                                        */
/* Drawn once for the top-left corner and then flipped into the other     */
/* three, so all four corners are the same piece of drawing turned around */
/* — which is how a printed border actually works.                        */
/* --------------------------------------------------------------------- */

const sprig = (color: string) => `
  <g fill="none" stroke="${color}" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 86 C 5 50, 24 18, 62 4"/>
    <path d="M8 74 C 20 58, 30 44, 33 26"/>
    <path d="M33 26 C 40 34, 50 39, 63 40"/>
    <path d="M14 56 C 6 50, 3 38, 8 29 C 17 35, 20 47, 14 56Z"/>
    <path d="M22 42 C 24 32, 34 26, 43 27 C 39 37, 30 43, 22 42Z"/>
    <path d="M40 16 C 34 10, 33 2, 36 -3 C 44 1, 46 10, 40 16Z"/>
    <path d="M52 30 C 56 22, 66 19, 73 22 C 68 30, 59 33, 52 30Z"/>
    <path d="M76 9 C 82 4, 91 5, 95 10 C 89 16, 80 15, 76 9Z"/>
  </g>
  <g fill="none" stroke="${color}" stroke-width="1.05" stroke-linecap="round">
    <path d="M26 14 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0"/>
    <path d="M26 14 m-3 1 a3.2 3.2 0 1 1 4.6 -2.4"/>
    <path d="M9 100 m-4.6 0 a4.6 4.6 0 1 0 9.2 0 a4.6 4.6 0 1 0 -9.2 0"/>
    <path d="M9 100 m-2.2 0.8 a2.4 2.4 0 1 1 3.5 -1.9"/>
    <circle cx="56" cy="12" r="1.7"/>
    <circle cx="4" cy="66" r="1.7"/>
    <circle cx="44" cy="44" r="1.5"/>
  </g>`;

const cornerTile = (color: string, flip: string) => uri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <g transform="${flip}">${sprig(color)}</g>
</svg>`);

/** Four corners of the same sprig, for a given ink. */
export const corners = (color: string) => ({
  topLeft: cornerTile(color, 'translate(0,0)'),
  topRight: cornerTile(color, 'translate(120,0) scale(-1,1)'),
  bottomLeft: cornerTile(color, 'translate(0,120) scale(1,-1)'),
  bottomRight: cornerTile(color, 'translate(120,120) scale(-1,-1)'),
});

/** A small centred spray, used under section headings. */
export const spray = (color: string) => uri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 40" width="200" height="40">
  <g fill="none" stroke="${color}" stroke-width="1.15" stroke-linecap="round" stroke-linejoin="round">
    <path d="M12 20 L74 20 M126 20 L188 20"/>
    <path d="M100 20 C 94 13, 94 5, 98 1 C 104 6, 105 14, 100 20Z"/>
    <path d="M100 20 C 106 27, 106 35, 102 39 C 96 34, 95 26, 100 20Z"/>
    <path d="M86 20 C 80 14, 72 13, 67 16 C 72 23, 81 24, 86 20Z"/>
    <path d="M114 20 C 120 14, 128 13, 133 16 C 128 23, 119 24, 114 20Z"/>
    <circle cx="100" cy="20" r="2.2"/>
    <circle cx="60" cy="20" r="1.5"/>
    <circle cx="140" cy="20" r="1.5"/>
  </g>
</svg>`);
