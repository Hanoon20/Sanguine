import type { RefObject } from 'react';

interface Props {
  innerRef: RefObject<HTMLDivElement>;
  coreRef: RefObject<HTMLDivElement>;
}

/** Warm light from inside the pocket, built from stacked radial gradients. */
export function GoldenLight({ innerRef, coreRef }: Props) {
  return (
    <div className="light" ref={innerRef} aria-hidden="true">
      <div className="light__core" ref={coreRef} />
    </div>
  );
}

export default GoldenLight;
