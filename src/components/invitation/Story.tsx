import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

/** Three moments, a line each, read across rather than down. */
export function Story() {
  return (
    <section className="section section--center" aria-labelledby="story-title">
      <FloralFrame />
      <h2 className="section__title" id="story-title" data-scroll>
        Our story
      </h2>

      <ol className="story">
        {wedding.story.map((chapter, i) => (
          <li
            className="chapter"
            key={chapter.year}
            data-scroll
            style={{ '--i': i } as React.CSSProperties}
          >
            <span className="chapter__year">{chapter.year}</span>
            <h3 className="chapter__title">{chapter.title}</h3>
            <p className="chapter__body">{chapter.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default Story;
