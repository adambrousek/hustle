import { useEffect, useMemo, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  HEADLINE_INDENT_PRESETS,
  DEFAULT_HEADLINE_INDENT,
  detectHeadlineIndentPreset,
  resolveHeadlineIndents,
} from '../headlineIndents';

gsap.registerPlugin(ScrollTrigger);

export default function ShowcaseSectionBlock({ section, bindSection }) {
  const {
    Component,
    props,
    id,
    name,
    stackLayouts,
    defaultStackLayout,
    supportsFlip,
    supportsParallax,
    supportsHeadlineIndent,
  } = section;
  const hasParallax = supportsParallax ?? Boolean(props.media?.length);
  const [stackLayout, setStackLayout] = useState(
    defaultStackLayout ?? stackLayouts?.[0]?.id ?? 'stagger',
  );
  const [flip, setFlip] = useState(props.flip ?? false);
  const [headlineIndent, setHeadlineIndent] = useState(
    detectHeadlineIndentPreset(props.headline?.lineIndents ?? props.title?.lineIndents) ??
      DEFAULT_HEADLINE_INDENT,
  );

  const resolvedProps = useMemo(() => {
    const settings = { headlineIndent };
    const next = { ...props, stackLayout, flip };

    if (props.headline) {
      next.headline = resolveHeadlineIndents(props.headline, settings);
    }

    if (props.title) {
      next.title = resolveHeadlineIndents(props.title, settings);
    }

    return next;
  }, [props, stackLayout, flip, headlineIndent]);

  useEffect(() => {
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [stackLayout, flip, headlineIndent]);

  return (
    <div className="ds-showcase-block" id={`section-${id}`}>
      <div className="ds-showcase-block__divider">
        <div className="ds-showcase-block__divider-row">
          <h2 className="ds-showcase-block__name">{name}</h2>
          <div className="ds-showcase-block__controls">
            {supportsHeadlineIndent && !props.headline?.uniform && !props.title?.uniform && (
              <div className="ds-showcase-stack-switcher" role="group" aria-label="Odsazení nadpisu">
                {HEADLINE_INDENT_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className={`ds-showcase-stack-switcher__btn${
                      headlineIndent === preset.id ? ' is-active' : ''
                    }`}
                    onClick={() => setHeadlineIndent(preset.id)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}
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
          {...resolvedProps}
          bindRef={hasParallax ? bindSection : undefined}
        />
      </div>
    </div>
  );
}
