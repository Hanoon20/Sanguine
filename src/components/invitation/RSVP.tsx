import { wedding } from '../../config/wedding';

export function RSVP() {
  const { whatsapp, email, deadline } = wedding.rsvp;
  const subject = encodeURIComponent(`RSVP — ${wedding.bride} and ${wedding.groom}`);
  const body = encodeURIComponent(
    `Hello! Replying to the invitation for ${wedding.date}.\n\nName(s):\nAttending:\nAnything we should know:`,
  );

  return (
    <section className="section section--center rsvp" aria-labelledby="rsvp-title">
      <h2 className="section__title" id="rsvp-title">
        Let us know
      </h2>
      <p className="rsvp__deadline">{deadline}</p>
      <div className="rsvp__actions">
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
        <a className={whatsapp ? 'btn btn--ghost' : 'btn'} href={`mailto:${email}?subject=${subject}&body=${body}`}>
          Reply by email
        </a>
      </div>
      <p className="rsvp__dress">{wedding.dressCode}</p>
    </section>
  );
}

export default RSVP;
