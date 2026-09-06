import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

/** Where to go, the map, and the one link that answers everything else. */
export function Location() {
  const { name, address, mapsUrl, mapEmbedUrl, note } = wedding.location;

  return (
    <section className="section section--center" aria-labelledby="location-title">
      <FloralFrame />
      <h2 className="section__title" id="location-title" data-scroll>
        Where
      </h2>

      <div data-scroll>
        <p className="place__name">{name}</p>
        <address className="place__address">
          {address.map((line) => (
            <span key={line}>{line}</span>
          ))}
        </address>
      </div>

      {mapEmbedUrl ? (
        <div className="map" data-scroll>
          <iframe
            className="map__frame"
            src={mapEmbedUrl}
            title={`Map showing ${name}`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      ) : null}

      <p className="place__note" data-scroll>
        {note}
      </p>

      <div className="rsvp__actions" data-scroll>
        <a className="btn btn--ghost" href={mapsUrl} target="_blank" rel="noreferrer">
          Open in maps
        </a>
      </div>
    </section>
  );
}

export default Location;
