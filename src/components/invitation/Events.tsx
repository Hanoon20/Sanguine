import { wedding } from '../../config/wedding';

export function Events() {
  return (
    <section className="section" aria-labelledby="events-title">
      <h2 className="section__title" id="events-title">
        The weekend
      </h2>
      <div className="events">
        {wedding.events.map((event) => (
          <article className="event" key={event.name}>
            <h3 className="event__name">{event.name}</h3>
            <p className="event__time">{event.time}</p>
            <p className="event__place">{event.place}</p>
            <p className="event__detail">{event.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Events;
