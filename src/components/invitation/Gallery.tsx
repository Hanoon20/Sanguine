import { wedding } from '../../config/wedding';
import { photos } from '../../assets/photos';
import FloralFrame from './FloralFrame';

/**
 * Only plates that actually have a photograph are drawn, so the section is
 * never a row of empty boxes while pictures are still being gathered. With a
 * single picture it becomes one full-width plate rather than a lonely tile.
 */
export function Gallery() {
  const plates = wedding.gallery
    .map((item, i) => ({
      caption: item.caption,
      image: item.image || (i === 0 ? wedding.heroImage || photos.cover : ''),
    }))
    .filter((item) => item.image);

  if (plates.length === 0) return null;

  return (
    <section className="section section--center" aria-labelledby="gallery-title">
      <FloralFrame />
      <h2 className="section__title" id="gallery-title" data-scroll>
        A few of ours
      </h2>
      <div className={plates.length === 1 ? 'gallery gallery--single' : 'gallery'}>
        {plates.map((item) => (
          <figure className="plate" key={item.caption} data-scroll>
            <div className="plate__image">
              <img src={item.image} alt={item.caption} loading="lazy" decoding="async" />
            </div>
            <figcaption className="plate__caption">{item.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export default Gallery;
