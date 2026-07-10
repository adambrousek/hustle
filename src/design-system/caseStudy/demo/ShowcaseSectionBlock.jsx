import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseSectionBlock({ section, bindSection }) {
  const { Component, props, id, name, stackLayouts, defaultStackLayout, supportsFlip, supportsParallax } =
    section;
  const hasParallax = supportsParallax ?? Boolean(props.media?.length);
  const [stackLayout, setStackLayout] = useState(
    defaultStackLayout ?? stackLayouts?.[0]?.id ?? 'stagger',
  );
  const [flip, setFlip] = useState(props.flip ?? false);

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [stackLayout, flip]);

  return (
    <div className="ds-showcase-block" id={`section-${id}`}>
      <div className="ds-showcase-block__divider">
        <div className="ds-showcase-block__divider-row">
          <h2 className="ds-showcase-block__name">{name}</h2>
          <div className="ds-showcase-block__controls">
            {supportsFlip && (
              <div className="ds-showcase-stack-switcher" role="group" aria-label="Pozice sloupců">
                <button
                  type="button"
                  className={`ds-showcase-stack-switcher__btn${!flip ? ' is-active' : ''}`}
                  onClick={() => setFlip(false)}
                >
                  Text vlevo
                </button>
                <button
                  type="button"
                  className={`ds-showcase-stack-switcher__btn${flip ? ' is-active' : ''}`}
                  onClick={() => setFlip(true)}
                >
                  Text vpravo
                </button>
              </div>
            )}
            {stackLayouts?.length > 1 && (
              <div className="ds-showcase-stack-switcher" role="group" aria-label="Media stack layout">
                {stackLayouts.map((layout) => (
                  <button
                    key={layout.id}
                    type="button"
                    className={`ds-showcase-stack-switcher__btn${
                      stackLayout === layout.id ? ' is-active' : ''
                    }`}
                    onClick={() => setStackLayout(layout.id)}
                  >
                    {layout.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="ds-showcase-block__preview">
        <Component
          {...props}
          stackLayout={stackLayout}
          flip={flip}
          bindRef={hasParallax ? bindSection : undefined}
        />
      </div>
    </div>
  );
}
