import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

export function Events() {
  return (
    <section className="section section--center" aria-labelledby="events-title">
      <FloralFrame />
      <h2 className="section__title" id="events-title" data-scroll>
        The weekend
      </h2>
      <div className="events">
        {wedding.events.map((event) => (
          <article className="event" key={event.name} data-scroll>
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
