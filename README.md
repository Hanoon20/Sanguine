# Wedding envelope — opening experience

A luxury four-flap wedding envelope in burgundy card stock, sealed with ivory
wax. Pressing the seal plays a single five-and-a-half second sequence: the wax
breaks, the four flaps turn back on their folds, warm light rises out of the
pocket, the invitation is drawn up, and the card becomes the website.

Built with React, TypeScript, GSAP and CSS 3D. No Three.js — the envelope is
DOM and transforms only, so it stays fast on a phone.

## Running it

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # normal production build → dist/
npm run build:single # one self-contained index.html → dist/
```

`build:single` inlines the JS, CSS and every texture into a single HTML file.
It is the easiest thing to email to a client or drop on any host.

## Changing the wedding

Everything couple-specific is in `src/config/wedding.ts` — names, monogram,
dates, venue, the story chapters, the weekend schedule, gallery captions and
RSVP details. Nothing about the wedding is hard-coded in a component.

Two optional fields:

- `heroImage` — a path to a photograph. Left empty, the gallery shows toned
  paper plates instead.
- `sealSound` — a short audio file. Left empty, the opening is silent. It never
  autoplays and the animation never waits on it.

## How it is put together

```
src/
  components/
    envelope/    EnvelopeScene, EnvelopeBack, EnvelopeFlaps, WaxSeal,
                 GoldenLight, InvitationCard
    invitation/  InvitationHero, Countdown, Story, Events, Gallery, RSVP
  animations/    envelopeTimeline, flapAnimations, revealAnimations, easings
  config/        wedding.ts
  hooks/         useReducedMotion, usePointerParallax
  styles/        base.css, envelope.css, invitation.css
  assets/        textures.ts  (grain, paper fibre, floral emboss, crest)
```

`EnvelopeScene` collects refs, handles the tap and updates state. It contains
no animation code. `createEnvelopeOpeningTimeline(elements)` returns the whole
paused timeline, labelled `seal`, `sealRelease`, `topFlap`, `sideFlaps`,
`bottomFlap`, `light`, `invitation`, `takeover`, so any phase can be scrubbed
while tuning.

## Where the depth comes from

Each flap is two faces held apart in Z: burgundy stock outside, printed ivory
lining inside, with hairline drop shadows tracing the clipped edge so the paper
has a visible thickness. The four facets take light at four different angles,
which is what stops them reading as one flat panel. The top flap reaches past
the meeting point so it lies over the other three and casts onto them. A gold
rule is printed across the stock and breaks apart with the flaps. Shading is
driven by `--shade` and `--fold` from the timeline rather than by a loop.

## Accessibility and motion

The seal is a real `<button>`, reachable by keyboard, and the opening cannot be
triggered twice. With `prefers-reduced-motion: reduce` the 3D sequence is
skipped entirely for a plain fade, and the invitation is available immediately.

## Performance notes

Only `transform`, `opacity` and custom properties are animated. `will-change`
is set on the light for the length of its tween and cleared afterwards. The
seal's idle breath is the only loop on the page and it is killed on the first
tap. Photographs are lazy-loaded and never block the opening scene.
