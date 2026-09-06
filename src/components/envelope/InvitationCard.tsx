import type { RefObject } from 'react';
import { wedding } from '../../config/wedding';

interface Props {
  cardRef: RefObject<HTMLDivElement>;
  faceRef: RefObject<HTMLDivElement>;
  shadowRef: RefObject<HTMLDivElement>;
}

/**
 * The card itself. It starts hidden inside the pocket and is the piece that
 * carries the visitor across into the site, so its contents match the hero.
 */
export function InvitationCard({ cardRef, faceRef, shadowRef }: Props) {
  return (
    <div className="card" ref={cardRef} aria-hidden="true">
      <div className="card__shadow" ref={shadowRef} />
      <div className="card__face" ref={faceRef}>
        <p className="card__eyebrow" data-stagger>
          {wedding.invitationLine}
        </p>
        <p className="card__names" data-stagger>
          {wedding.bride}
          <span className="card__amp">and</span>
          {wedding.groom}
        </p>
        <div className="card__ornament" data-stagger />
        <p className="card__date" data-stagger>
          {wedding.date}
        </p>
        <p className="card__venue" data-stagger>
          {wedding.venue} · {wedding.city}
        </p>
      </div>
    </div>
  );
}

export default InvitationCard;
