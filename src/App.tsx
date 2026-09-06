import { useCallback, useEffect, useRef, useState } from 'react';
import EnvelopeScene from './components/envelope/EnvelopeScene';
import InvitationHero from './components/invitation/InvitationHero';
import Countdown from './components/invitation/Countdown';
import Story from './components/invitation/Story';
import Events from './components/invitation/Events';
import Gallery from './components/invitation/Gallery';
import RSVP from './components/invitation/RSVP';
import { wedding } from './config/wedding';
import { fibre, floralDark, floralLight, grain } from './assets/textures';
import './styles/base.css';
import './styles/envelope.css';
import './styles/invitation.css';

const textureVars = {
  '--tex-grain': grain,
  '--tex-fibre': fibre,
  '--tex-floral-light': floralLight,
  '--tex-floral-dark': floralDark,
} as React.CSSProperties;

export default function App() {
  const atmosphere = useRef<HTMLDivElement>(null);
  const site = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [finished, setFinished] = useState(false);

  /* The page does not scroll while the envelope is still closed. */
  useEffect(() => {
    document.body.dataset.locked = finished ? 'false' : 'true';
  }, [finished]);

  const onCardVisible = useCallback(() => setReady(true), []);
  const onComplete = useCallback(() => {
    setFinished(true);
    site.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div className="shell" ref={atmosphere} style={textureVars}>
      <div className="atmosphere" aria-hidden="true" />
      <div className="atmosphere__veil" aria-hidden="true" />
      <div className="atmosphere__grain" aria-hidden="true" />

      {!finished && (
        <EnvelopeScene
          atmosphereRef={atmosphere}
          siteRef={site}
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
        <InvitationHero />
        <Countdown />
        <Story />
        <Events />
        <Gallery />
        <RSVP />
        <footer className="footer">
          <p className="footer__mono">{wedding.monogram}</p>
          <p className="footer__line">
            {wedding.date} · {wedding.venue}
          </p>
        </footer>
      </main>
    </div>
  );
}
