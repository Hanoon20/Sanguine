import { wedding } from '../../config/wedding';
import { crest } from '../../assets/textures';

/** The first thing seen once the card has become the page. */
export function InvitationHero() {
  return (
    <header className="hero">
      <div className="hero__inner">
        <div
          className="hero__crest"
          style={{ aspectRatio: '1', backgroundImage: crest, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }}
          aria-hidden="true"
        />
        <p className="hero__eyebrow">{wedding.invitationLine}</p>
        <h1 className="hero__names">
          {wedding.bride}
          <span className="hero__amp">and</span>
          {wedding.groom}
        </h1>
        <div className="rule" aria-hidden="true" />
        <p className="hero__meta">{wedding.dateLong}</p>
        <p className="hero__place">
          {wedding.venue} · {wedding.city}
        </p>
      </div>
    </header>
  );
}

export default InvitationHero;
