import type { RefObject } from 'react';
import { wedding } from '../../config/wedding';

interface Props {
  sealRef: RefObject<HTMLButtonElement>;
  bodyRef: RefObject<HTMLSpanElement>;
  glowRef: RefObject<HTMLSpanElement>;
  onOpen: () => void;
  disabled: boolean;
}

/**
 * Ivory wax struck with the couple's monogram. It is a real button so the
 * keyboard, screen readers and touch all reach it the same way.
 */
export function WaxSeal({ sealRef, bodyRef, glowRef, onOpen, disabled }: Props) {
  return (
    <button
      type="button"
      className="seal"
      ref={sealRef}
      onClick={onOpen}
      disabled={disabled}
      aria-label={`Break the seal and open the invitation from ${wedding.bride} and ${wedding.groom}`}
    >
      <span className="seal__glow" ref={glowRef} aria-hidden="true" />
      <span className="seal__body" ref={bodyRef} aria-hidden="true">
        <span className="seal__pool" />
        <span className="seal__rim" />
        <span className="seal__disc">
          <span className="seal__mono">{wedding.monogram}</span>
        </span>
        <span className="seal__sheen" />
      </span>
      <span className="seal__shards" aria-hidden="true">
        <span className="seal__shard" />
        <span className="seal__shard" />
        <span className="seal__shard" />
        <span className="seal__shard" />
      </span>
    </button>
  );
}

export default WaxSeal;
