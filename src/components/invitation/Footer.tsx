import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

/**
 * The end of the page, in the same wine as the envelope it began with. It
 * closes the invitation rather than simply running out of content.
 */
export function Footer() {
  const { line, signoff } = wedding.closing;
  const credit = wedding.credit;

  return (
    <footer className="footer">
      <FloralFrame pale />

      <div className="footer__inner" data-scroll>
        <div className="footer__spray" aria-hidden="true" />

        <p className="footer__line">{line}</p>

        <p className="footer__mono" aria-hidden="true">
          {wedding.monogram}
        </p>

        <p className="footer__names">
          {wedding.groom} <span>and</span> {wedding.bride}
        </p>

        <p className="footer__meta">{wedding.dateLong}</p>
        <p className="footer__meta footer__meta--small">
          {wedding.venue} · {wedding.city}
        </p>

        <div className="footer__rule" aria-hidden="true" />

        {wedding.rsvp.email ? (
          <a className="footer__contact" href={`mailto:${wedding.rsvp.email}`}>
            {wedding.rsvp.email}
          </a>
        ) : null}

        <p className="footer__signoff">{signoff}</p>

        <a className="footer__top" href="#top">
          Back to the beginning
        </a>
      </div>

      {credit.name ? (
        <p className="footer__credit">
          {credit.label}{' '}
          <a href={credit.url} target="_blank" rel="noreferrer">
            {credit.name}
          </a>
        </p>
      ) : null}
    </footer>
  );
}

export default Footer;
