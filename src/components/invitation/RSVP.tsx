import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

export function RSVP() {
  const { whatsapp, email, deadline, contactNote } = wedding.rsvp;
  const subject = encodeURIComponent(`RSVP — ${wedding.groom} and ${wedding.bride}`);
  const body = encodeURIComponent(
    `Hello! Replying to the invitation for ${wedding.date}.\n\nName(s):\nAttending:\nAnything we should know:`,
  );

  return (
    <section className="section section--center rsvp" aria-labelledby="rsvp-title">
      <FloralFrame />
      <h2 className="section__title" id="rsvp-title" data-scroll>
        Let us know
      </h2>
      <p className="rsvp__deadline" data-scroll>
        {deadline}
      </p>

      {whatsapp || email ? (
        <div className="rsvp__actions" data-scroll>
          {whatsapp ? (
            <a
              className="btn"
              href={`https://wa.me/${whatsapp}?text=${body}`}
              target="_blank"
              rel="noreferrer"
            >
              Reply on WhatsApp
            </a>
          ) : null}
          {email ? (
            <a
              className={whatsapp ? 'btn btn--ghost' : 'btn'}
              href={`mailto:${email}?subject=${subject}&body=${body}`}
            >
              Reply by email
            </a>
          ) : null}
        </div>
      ) : (
        <p className="rsvp__contact-note" data-scroll>
          {contactNote}
        </p>
      )}

      <p className="rsvp__dress" data-scroll>
        {wedding.dressCode}
      </p>
    </section>
  );
}

export default RSVP;
