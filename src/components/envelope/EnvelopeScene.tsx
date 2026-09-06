import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';
import gsap from '../../animations/easings';
import {
  createEnvelopeOpeningTimeline,
  createReducedMotionTimeline,
  createSealIdle,
  type EnvelopeElements,
} from '../../animations/envelopeTimeline';
import { useReducedMotion } from '../../hooks/useReducedMotion';
import { usePointerParallax } from '../../hooks/usePointerParallax';
import { wedding } from '../../config/wedding';
import EnvelopeBack from './EnvelopeBack';
import EnvelopeFlaps from './EnvelopeFlaps';
import GoldenLight from './GoldenLight';
import WaxSeal from './WaxSeal';

interface Props {
  atmosphereRef: RefObject<HTMLDivElement>;
  siteRef: RefObject<HTMLDivElement>;
  backdropRef: RefObject<HTMLDivElement>;
  /** Called once the card is legible, so the page beneath can take focus. */
  onCardVisible: () => void;
  onComplete: () => void;
}

const MOTES = [
  { left: '18%', top: '68%', dx: '26px', dur: '19s', delay: '0s' },
  { left: '31%', top: '82%', dx: '-18px', dur: '24s', delay: '3.5s' },
  { left: '52%', top: '74%', dx: '14px', dur: '21s', delay: '7s' },
  { left: '68%', top: '86%', dx: '-24px', dur: '26s', delay: '1.8s' },
  { left: '79%', top: '70%', dx: '20px', dur: '23s', delay: '9.5s' },
  { left: '44%', top: '90%', dx: '-12px', dur: '28s', delay: '5.2s' },
];

export function EnvelopeScene({
  atmosphereRef,
  siteRef,
  backdropRef,
  onCardVisible,
  onComplete,
}: Props) {
  const reduced = useReducedMotion();

  const stage = useRef<HTMLDivElement>(null);
  const camera = useRef<HTMLDivElement>(null);
  const stageInner = useRef<HTMLDivElement>(null);
  const envelope = useRef<HTMLDivElement>(null);
  const shadow = useRef<HTMLDivElement>(null);
  const hint = useRef<HTMLParagraphElement>(null);
  const overline = useRef<HTMLParagraphElement>(null);
  const message = useRef<HTMLDivElement>(null);

  const flapTop = useRef<HTMLDivElement>(null);
  const flapRight = useRef<HTMLDivElement>(null);
  const flapBottom = useRef<HTMLDivElement>(null);
  const flapLeft = useRef<HTMLDivElement>(null);

  const seal = useRef<HTMLButtonElement>(null);
  const sealBody = useRef<HTMLSpanElement>(null);
  const sealGlow = useRef<HTMLSpanElement>(null);

  const light = useRef<HTMLDivElement>(null);
  const lightCore = useRef<HTMLDivElement>(null);

  const idle = useRef<gsap.core.Timeline | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const started = useRef(false);
  const [opening, setOpening] = useState(false);

  usePointerParallax(stageInner, { enabled: !reduced });

  /* The idle breath on the closed seal. It is the only loop on the page and
     it is killed the instant the seal is pressed. */
  useEffect(() => {
    if (reduced || !sealBody.current) return;
    idle.current = createSealIdle(sealBody.current);
    return () => {
      idle.current?.kill();
      idle.current = null;
    };
  }, [reduced]);

  const collect = useCallback((): EnvelopeElements | null => {
    const els = {
      scene: stage.current,
      camera: camera.current,
      inner: stageInner.current,
      envelope: envelope.current,
      shadow: shadow.current,
      hint: hint.current,
      overline: overline.current,
      message: message.current,
      seal: seal.current,
      sealBody: sealBody.current,
      sealGlow: sealGlow.current,
      light: light.current,
      lightCore: lightCore.current,
      flapTop: flapTop.current,
      flapRight: flapRight.current,
      flapBottom: flapBottom.current,
      flapLeft: flapLeft.current,
      atmosphere: atmosphereRef.current,
      site: siteRef.current,
      backdrop: backdropRef.current,
      scrim: siteRef.current?.querySelector<HTMLElement>('.hero__scrim') ?? null,
    };

    if (Object.values(els).some((el) => !el)) return null;

    return {
      ...(els as unknown as EnvelopeElements),
      shards: Array.from(stage.current!.querySelectorAll<HTMLElement>('.seal__shard')),
      heroItems: Array.from(siteRef.current!.querySelectorAll<HTMLElement>('[data-reveal]')),
    };
  }, [atmosphereRef, siteRef, backdropRef]);

  const open = useCallback(() => {
    /* One opening only. Repeated taps, double-taps and a keyboard press
       arriving together all land here and are ignored after the first. */
    if (started.current) return;
    const elements = collect();
    if (!elements) return;
    started.current = true;
    setOpening(true);

    idle.current?.kill();
    idle.current = null;
    gsap.set(sealBody.current, { '--idle': 0 });

    if (wedding.sealSound) {
      const audio = new Audio(wedding.sealSound);
      audio.volume = 0.35;
      /* Sound is decoration. If the browser refuses it, nothing changes. */
      void audio.play().catch(() => undefined);
    }

    timeline.current = reduced
      ? createReducedMotionTimeline(elements, { onComplete, onCardVisible })
      : createEnvelopeOpeningTimeline(elements, { onComplete, onCardVisible });

    timeline.current.play();
  }, [collect, onCardVisible, onComplete, reduced]);

  useEffect(() => () => {
    timeline.current?.kill();
  }, []);

  return (
    <div className="stage" ref={stage} data-open={opening}>
      <div className="motes" aria-hidden="true">
        {MOTES.map((m, i) => (
          <span
            key={i}
            className="mote"
            style={
              {
                left: m.left,
                top: m.top,
                '--dx': m.dx,
                '--dur': m.dur,
                '--delay': m.delay,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="stage__camera" ref={camera}>
        <div className="stage__inner" ref={stageInner}>
          <p className="overline" ref={overline}>
            {wedding.invitedLine}
          </p>

          <div className="contact-shadow" ref={shadow} aria-hidden="true" />

          <div className="envelope" ref={envelope}>
            <EnvelopeBack />
            <EnvelopeFlaps
              refs={{ top: flapTop, right: flapRight, bottom: flapBottom, left: flapLeft }}
            />
            <GoldenLight innerRef={light} coreRef={lightCore} />

            {/* Printed on the pocket, so it is there the moment the flaps
                are out of the way and gone again before the photograph. */}
            <div className="envelope__message" ref={message} aria-hidden="true">
              <span className="envelope__message-name">{wedding.groom}</span>
              <span className="envelope__message-word">{wedding.unionWord}</span>
              <span className="envelope__message-name">{wedding.bride}</span>
            </div>
            <WaxSeal
              sealRef={seal}
              bodyRef={sealBody}
              glowRef={sealGlow}
              onOpen={open}
              disabled={opening}
            />
          </div>

          <p className="hint" ref={hint}>
            {reduced ? 'Select the seal to open' : 'Press the seal to open'}
          </p>
        </div>
      </div>
    </div>
  );
}

export default EnvelopeScene;
