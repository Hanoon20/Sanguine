import { wedding } from '../../config/wedding';
import { photos } from '../../assets/photos';
import FloralFrame from './FloralFrame';

/**
 * Only plates that actually have a photograph are drawn, so the section is
 * never a row of empty boxes while pictures are still being gathered. With a
 * single picture it becomes one full-width plate rather than a lonely tile.
 */
export function Gallery() {
  /* An entry without its own `image` falls back to the bundled photograph in
     the same position, which also carries a smaller AVIF encoding. */
  const plates = wedding.gallery
    .map((item, i) => {
      const bundled = item.image ? undefined : photos.gallery[i];
      return {
        caption: item.caption,
        image: item.image || bundled?.webp || '',
        avif: bundled?.avif ?? '',
      };
    })
    .filter((item) => item.image);

  if (plates.length === 0) return null;

  return (
    <section className="section section--center" aria-labelledby="gallery-title">
      <FloralFrame />
      <h2 className="section__title" id="gallery-title" data-scroll>
        A few of ours
      </h2>
      <div className={plates.length === 1 ? 'gallery gallery--single' : 'gallery'}>
        {plates.map((item, i) => (
          <figure className="plate" key={i} data-scroll>
            <div className="plate__image">
              <picture>
                {item.avif ? <source srcSet={item.avif} type="image/avif" /> : null}
                <img src={item.image} alt={item.caption} loading="lazy" decoding="async" />
              </picture>
            </div>
            <figcaption className="plate__caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
