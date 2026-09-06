import { wedding } from '../../config/wedding';

/**
 * Photographs are lazy-loaded and are never part of the opening scene. Until
 * they are supplied, each plate shows as toned paper with its caption.
 */
export function Gallery() {
  return (
    <section className="section" aria-labelledby="gallery-title">
      <h2 className="section__title" id="gallery-title">
        A few of ours
      </h2>
      <div className="gallery">
        {wedding.gallery.map((item, i) => (
          <figure className="plate" key={item.caption}>
            <div className="plate__image">
              {i === 0 && wedding.heroImage ? (
                <img src={wedding.heroImage} alt={item.caption} loading="lazy" decoding="async" />
              ) : null}
            </div>
            <figcaption className="plate__caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
