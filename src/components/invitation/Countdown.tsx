import { useEffect, useState } from 'react';
import { wedding } from '../../config/wedding';
import FloralFrame from './FloralFrame';

const UNITS = [
  { key: 'days', label: 'days' },
  { key: 'hours', label: 'hours' },
  { key: 'minutes', label: 'minutes' },
  { key: 'seconds', label: 'seconds' },
] as const;

type Remaining = Record<(typeof UNITS)[number]['key'], number>;

function remaining(target: number): Remaining {
  const diff = Math.max(0, target - Date.now());
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
  };
}

export function Countdown() {
  const target = new Date(wedding.dateISO).getTime();
  const [left, setLeft] = useState(() => remaining(target));

  useEffect(() => {
    const id = window.setInterval(() => setLeft(remaining(target)), 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const arrived = left.days + left.hours + left.minutes + left.seconds === 0;

  return (
    <section className="section section--center" aria-labelledby="countdown-title">
      <FloralFrame />
      <h2 className="section__title" id="countdown-title" data-scroll>
        {arrived ? 'Today' : 'Until the day'}
      </h2>
      <div className="countdown" data-scroll>
        {UNITS.map(({ key, label }) => (
          <div className="countdown__unit" key={key}>
            <span className="countdown__value">{String(left[key]).padStart(2, '0')}</span>
            <span className="countdown__label">{label}</span>
          </div>
        ))}
      </div>
      <p className="countdown__note" data-scroll>
        {arrived ? 'We are so glad you are here.' : `We will be married on ${wedding.date}.`}
      </p>
    </section>
  );
}

export default Countdown;
