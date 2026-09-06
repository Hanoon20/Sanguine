import { useCallback, useEffect, useRef, useState } from 'react';
import EnvelopeScene from './components/envelope/EnvelopeScene';
import InvitationHero from './components/invitation/InvitationHero';
import Countdown from './components/invitation/Countdown';
import Story from './components/invitation/Story';
import Events from './components/invitation/Events';
import Gallery from './components/invitation/Gallery';
import Location from './components/invitation/Location';
import RSVP from './components/invitation/RSVP';
import Footer from './components/invitation/Footer';
import { useScrollReveal } from './hooks/useScrollReveal';
import { useReducedMotion } from './hooks/useReducedMotion';
import { corners, fibre, floralDark, floralLight, grain, spray } from './assets/textures';
import './styles/base.css';
import './styles/envelope.css';
import './styles/invitation.css';

/* Two inks for the same border: gold on the ivory sections, a paler
   champagne on the hero, where it sits over the photograph. */
const gold = corners('#b58e42');
const pale = corners('#ecd6a4');

const textureVars = {
  '--tex-grain': grain,
  '--tex-fibre': fibre,
  '--tex-floral-light': floralLight,
  '--tex-floral-dark': floralDark,

  '--corner-tl': gold.topLeft,
  '--corner-tr': gold.topRight,
  '--corner-bl': gold.bottomLeft,
  '--corner-br': gold.bottomRight,

  '--corner-pale-tl': pale.topLeft,
  '--corner-pale-tr': pale.topRight,
  '--corner-pale-bl': pale.bottomLeft,
  '--corner-pale-br': pale.bottomRight,

  '--spray': spray('#b58e42'),
  '--spray-pale': spray('#ecd6a4'),
} as React.CSSProperties;

export default function App() {
  const atmosphere = useRef<HTMLDivElement>(null);
  const site = useRef<HTMLDivElement>(null);
  const backdrop = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);

  /* The page does not scroll while the envelope is still closed. It is
     released the moment the photograph is up — the hero's wording keeps
     arriving after that, and there is no reason to hold anyone there for it. */
  useEffect(() => {
    const root = document.documentElement;
    if (ready) root.removeAttribute('data-locked');
    else root.dataset.locked = 'true';

    /* Whatever else happens, the page is never left unscrollable. */
    return () => root.removeAttribute('data-locked');
  }, [ready]);

  useScrollReveal(site, !reduced);

  const onCardVisible = useCallback(() => setReady(true), []);
  const onComplete = useCallback(() => {
    setFinished(true);
    site.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="shell" ref={atmosphere} style={textureVars}>
      <div className="atmosphere" aria-hidden="true" />
      <div className="atmosphere__veil" aria-hidden="true" />

      {!finished && (
        <EnvelopeScene
          atmosphereRef={atmosphere}
          siteRef={site}
          backdropRef={backdrop}
          onCardVisible={onCardVisible}
          onComplete={onComplete}
        />
      )}

      <main
        className="site"
        ref={site}
        data-ready={ready}
        tabIndex={-1}
        aria-hidden={ready ? undefined : true}
        style={finished ? { opacity: 1 } : undefined}
      >
        <div className="atmosphere__grain" aria-hidden="true" />
        <InvitationHero backdropRef={backdrop} />
        <Countdown />
        <Story />
        <Events />
        <Gallery />
        <Location />
        <RSVP />
        <Footer />
      </main>
    </div>
  );
}
