import type { RefObject } from 'react';
import { wedding } from '../../config/wedding';
import { photos } from '../../assets/photos';
import FloralFrame from './FloralFrame';

interface Props {
  /** The backdrop counter-zooms as the card dissolves into it. */
  backdropRef: RefObject<HTMLDivElement>;
}

/**
 * The first thing seen once the card has become the page: the couple's
 * photograph held out of focus, a warm scrim over it, and the whole of the
 * day's detail set on top.
 */
export function InvitationHero({ backdropRef }: Props) {
  const cover = wedding.heroImage || photos.cover;

  return (
    <header className="hero">
      <div
        className="hero__backdrop"
        ref={backdropRef}
        style={{ backgroundImage: `url(${cover})` }}
        aria-hidden="true"
      />
      <div className="hero__scrim" aria-hidden="true" />
      <FloralFrame pale reveal />

      <div className="hero__inner">
        <p className="hero__eyebrow" data-reveal>{wedding.invitationLine}</p>

        <h1 className="hero__names" data-reveal>
          {wedding.groom}
          <span className="hero__amp">and</span>
          {wedding.bride}
        </h1>

        <div className="rule" data-reveal aria-hidden="true" />

        <p className="hero__meta" data-reveal>{wedding.dateLong}</p>
        <p className="hero__place" data-reveal>
          {wedding.venue} · {wedding.city}
        </p>

        <ul className="hero__schedule">
          {wedding.events.map((event) => (
            <li className="hero__event" data-reveal key={event.name}>
              <span className="hero__event-time">{event.time}</span>
              <span className="hero__event-name">{event.name}</span>
              <span className="hero__event-place">{event.place}</span>
            </li>
          ))}
        </ul>

        <p className="hero__dress" data-reveal>{wedding.dressCode}</p>
      </div>

      <span className="hero__scroll" aria-hidden="true" />
    </header>
  );
}

export default InvitationHero;
