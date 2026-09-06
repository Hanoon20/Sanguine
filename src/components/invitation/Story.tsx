import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

export function Story() {
  return (
    <section className="section" aria-labelledby="story-title">
      <FloralFrame />
      <h2 className="section__title" id="story-title">
        How we got here
      </h2>
      <div className="story">
        {wedding.story.map((chapter) => (
          <article className="chapter" key={chapter.year}>
            <p className="chapter__year">{chapter.year}</p>
            <h3 className="chapter__title">{chapter.title}</h3>
            <p className="chapter__body">{chapter.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Story;
