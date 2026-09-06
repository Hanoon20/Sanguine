import type { RefObject } from 'react';

type Div = RefObject<HTMLDivElement>;

interface FlapProps {
  side: 'top' | 'right' | 'bottom' | 'left';
  innerRef: Div;
}

/**
 * One flap: an outer burgundy face, an inner printed face, and between them a
 * slightly larger layer of pale stock whose rim shows all the way round as
 * the cut edge of the paper. Three shading layers on top are driven by the
 * timeline as the fold turns: the shadow it gathers, the darkening at the
 * hinge, and the highlight that sweeps across it on the way past.
 */
function Flap({ side, innerRef }: FlapProps) {
  return (
    <div className={`flap flap--${side}`} ref={innerRef} aria-hidden="true">
      <div className="flap__face flap__face--in" />
      <div className="flap__core" />
      <div className="flap__face flap__face--out">
        <div className="flap__rule" />
        <div className="flap__fold" />
        <div className="flap__gloss" />
        <div className="flap__shade" />
      </div>
    </div>
  );
}

export interface EnvelopeFlapRefs {
  top: Div;
  right: Div;
  bottom: Div;
  left: Div;
}

export function EnvelopeFlaps({ refs }: { refs: EnvelopeFlapRefs }) {
  return (
    <>
      <Flap side="bottom" innerRef={refs.bottom} />
      <Flap side="left" innerRef={refs.left} />
      <Flap side="right" innerRef={refs.right} />
      <Flap side="top" innerRef={refs.top} />
    </>
  );
}

export default EnvelopeFlaps;
