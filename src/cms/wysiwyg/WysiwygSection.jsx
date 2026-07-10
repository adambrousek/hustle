import CaseMediaStack from '../../design-system/caseStudy/primitives/CaseMediaStack';
import CaseSceneProofs from '../../design-system/caseStudy/primitives/CaseSceneProofs';
import CaseShift from '../../design-system/caseStudy/primitives/CaseShift';
import CaseCtaSection from '../../design-system/caseStudy/sections/CaseCtaSection';
import { resolveHeadlineIndents } from '../../design-system/caseStudy/headlineIndents';
import { blockToProps } from '../sectionTypes';
import EditableLogo from './EditableLogo';
import { EditableHeadline, EditableProse, EditableText } from './EditableText';

function resolvedHeadline(headline, settings) {
  return resolveHeadlineIndents(headline ?? { lines: ['Nadpis'] }, settings);
}

function MediaEditor({ media = [], onChange, readOnly, stackLayout = 'stagger', stackType = 'zigzag' }) {
  const editItem = (index) => {
    const item = media[index];
    const current = item.type === 'video' ? item.src : item.src;
    const next = window.prompt('URL videa nebo obrázku', current);
    if (!next) return;
    const updated = [...media];
    if (item.type === 'video') {
      updated[index] = { ...item, src: next };
    } else {
      updated[index] = { src: next };
    }
    onChange(updated);
  };

  return (
    <div className="wysiwyg-media-editor">
      {!readOnly && (
        <div className="wysiwyg-media-editor__actions">
          {media.map((item, i) => (
            <button key={i} type="button" className="wysiwyg-media-editor__btn" onClick={() => editItem(i)}>
              Upravit médium {i + 1}
            </button>
          ))}
          <button
            type="button"
            className="wysiwyg-media-editor__btn"
            onClick={() => {
              const src = window.prompt('URL videa', '/videos/pilulka-1.mp4');
              if (src) onChange([...media, { type: 'video', src }]);
            }}
          >
            + Video
          </button>
        </div>
      )}
      {media.length > 0 && (
        <CaseMediaStack
          items={media}
          visualVariant="pilulka"
          stackLayout={stackLayout}
          stackType={stackType}
        />
      )}
    </div>
  );
}

function IntroSection({ content, settings = {}, onContentChange, readOnly, stackLayout, layout = 'default' }) {
  const headline = resolvedHeadline(content.headline, settings);
  const onHeadlineChange = (nextHeadline) => {
    onContentChange({
      ...content,
      headline: resolveHeadlineIndents(nextHeadline, settings),
    });
  };

  if (layout === 'hero-split') {
    return (
      <section className="pilulka-chapter pilulka-chapter--intro pilulka-chapter--hero-split" data-section="intro">
        <div className="pilulka-chapter__intro-shell">
          <div className="pilulka-chapter__hero-split">
            <div className="pilulka-chapter__intro-hero">
              <CaseMediaStack
                items={content.media ?? []}
                visualVariant={content.visualVariant ?? 'pilulka'}
                stackLayout={stackLayout}
                stackType="intro"
              />
              <EditableHeadline
                headline={headline}
                onChange={onHeadlineChange}
                readOnly={readOnly}
                as="h1"
              />
            </div>
            <div className="pilulka-chapter__hero-aside">
              {content.subhead?.lines?.length > 0 && (
                <EditableHeadline
                  headline={content.subhead}
                  onChange={(subhead) => onContentChange({ ...content, subhead })}
                  readOnly={readOnly}
                  as="h2"
                  className="pilulka-chapter__subhead"
                  uniform
                />
              )}
              <EditableProse
                paragraphs={content.paragraphs}
                onChange={(paragraphs) => onContentChange({ ...content, paragraphs })}
                readOnly={readOnly}
              />
              {content.cta?.label && (
                <a className="hustle-link pilulka-chapter__cta" href={content.cta.href ?? '#'}>
                  {content.cta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="pilulka-chapter pilulka-chapter--intro" data-section="intro">
      <div className="pilulka-chapter__intro-shell">
        <EditableLogo
          logo={content.logo}
          readOnly={readOnly}
          onChange={(logo) => onContentChange({ ...content, logo })}
        />
        <div className="pilulka-chapter__intro-hero">
          <CaseMediaStack
            items={content.media ?? []}
            visualVariant={content.visualVariant ?? 'pilulka'}
            stackLayout={stackLayout}
            stackType="intro"
          />
          <EditableHeadline
            headline={headline}
            onChange={onHeadlineChange}
            readOnly={readOnly}
            as="h1"
          />
        </div>
        <div className="pilulka-chapter__intro-body">
          <EditableProse
            paragraphs={content.paragraphs}
            onChange={(paragraphs) => onContentChange({ ...content, paragraphs })}
            readOnly={readOnly}
          />
          {content.sceneProofs?.length > 0 && (
            <CaseSceneProofs
              proofs={content.sceneProofs}
              variant={content.sceneProofsVariant}
              placement="aside"
            />
          )}
        </div>
      </div>
    </section>
  );
}

function ZigzagSection({ content, settings, onContentChange, readOnly, stackLayout, layout = 'default' }) {
  const flip = settings.flip ?? false;
  const isCaseLink = layout === 'case-link' || layout === 'case-link-logo';
  const logoAboveProse = layout === 'case-link-logo';
  const headline = resolvedHeadline(content.headline, settings);
  const onHeadlineChange = (nextHeadline) => {
    onContentChange({
      ...content,
      headline: resolveHeadlineIndents(nextHeadline, settings),
    });
  };

  if (layout === 'split-prose') {
    return (
      <section
        className={`pilulka-chapter pilulka-chapter--split-prose${flip ? ' pilulka-chapter--flip' : ''}`}
        data-section="zigzag"
      >
        <div className="pilulka-chapter__split-row">
          <div className="pilulka-chapter__split-head">
            <EditableHeadline
              headline={headline}
              onChange={onHeadlineChange}
              readOnly={readOnly}
            />
          </div>
          <div className="pilulka-chapter__split-body">
            <EditableProse
              paragraphs={content.paragraphs}
              onChange={(paragraphs) => onContentChange({ ...content, paragraphs })}
              readOnly={readOnly}
            />
            {content.points?.length > 0 && (
              <ul className="pilulka-chapter__points">
                {content.points.map((line, i) => (
                  <li key={i} className="text-body">
                    {line}
                  </li>
                ))}
              </ul>
            )}
            <EditableProse
              paragraphs={content.closing}
              onChange={(closing) => onContentChange({ ...content, closing })}
              readOnly={readOnly}
            />
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'overlay') {
    return (
      <section
        className={`pilulka-chapter pilulka-chapter--overlay${flip ? ' pilulka-chapter--flip' : ''}`}
        data-section="zigzag"
      >
        <div className="pilulka-chapter__overlay-stage">
          <MediaEditor
            media={content.media}
            onChange={(media) => onContentChange({ ...content, media })}
            readOnly={readOnly}
            stackLayout={stackLayout}
            stackType="zigzag"
          />
          <div className="pilulka-chapter__overlay-layout">
            <EditableHeadline
              headline={headline}
              onChange={onHeadlineChange}
              readOnly={readOnly}
            />
            <div className="pilulka-chapter__overlay-side">
              <EditableLogo
                logo={content.logo}
                readOnly={readOnly}
                onChange={(logo) => onContentChange({ ...content, logo })}
              />
              <EditableProse
                paragraphs={content.paragraphs}
                onChange={(paragraphs) => onContentChange({ ...content, paragraphs })}
                readOnly={readOnly}
              />
              {content.cta?.label && (
                <a className="hustle-link pilulka-chapter__cta" href={content.cta.href ?? '#'}>
                  {content.cta.label}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`pilulka-chapter${flip ? ' pilulka-chapter--flip' : ''}${isCaseLink ? ' pilulka-chapter--case-link' : ''}`}
      data-section="zigzag"
    >
      <div className="pilulka-chapter__row">
        <div className="pilulka-chapter__text">
          {!logoAboveProse && (
            <EditableLogo
              logo={content.logo}
              readOnly={readOnly}
              onChange={(logo) => onContentChange({ ...content, logo })}
            />
          )}
          <EditableHeadline
            headline={headline}
            onChange={onHeadlineChange}
            readOnly={readOnly}
            uniform={content.headline?.uniform}
          />
          {isCaseLink ? (
            <div className="pilulka-chapter__body-flow">
              {logoAboveProse && (
                <EditableLogo
                  logo={content.logo}
                  readOnly={readOnly}
                  onChange={(logo) => onContentChange({ ...content, logo })}
                />
              )}
              <EditableProse
                paragraphs={content.paragraphs}
                onChange={(paragraphs) => onContentChange({ ...content, paragraphs })}
                readOnly={readOnly}
              />
              {content.shift && (
                <CaseShift before={content.shift.before} after={content.shift.after} />
              )}
              {content.sceneProofs && (
                <CaseSceneProofs
                  proofs={content.sceneProofs}
                  variant={content.sceneProofsVariant}
                  placement="body"
                />
              )}
              {(isCaseLink || content.cta?.label) && (
                <a className="hustle-link pilulka-chapter__cta" href={content.cta?.href ?? '#'}>
                  {content.cta?.label ?? 'VÍCE'}
                </a>
              )}
            </div>
          ) : (
            <>
              {logoAboveProse && (
                <EditableLogo
                  logo={content.logo}
                  readOnly={readOnly}
                  onChange={(logo) => onContentChange({ ...content, logo })}
                />
              )}
              <EditableProse
                paragraphs={content.paragraphs}
                onChange={(paragraphs) => onContentChange({ ...content, paragraphs })}
                readOnly={readOnly}
              />
              {content.shift && (
                <CaseShift before={content.shift.before} after={content.shift.after} />
              )}
              {content.sceneProofs && (
                <CaseSceneProofs
                  proofs={content.sceneProofs}
                  variant={content.sceneProofsVariant}
                  placement="body"
                />
              )}
              {content.cta?.label && (
                <a className="hustle-link pilulka-chapter__cta" href={content.cta?.href ?? '#'}>
                  {content.cta.label}
                </a>
              )}
            </>
          )}
        </div>
        <MediaEditor
          media={content.media}
          onChange={(media) => onContentChange({ ...content, media })}
          readOnly={readOnly}
          stackLayout={stackLayout}
          stackType="zigzag"
        />
      </div>
    </section>
  );
}

function KeyLearningsSection({ content, settings = {}, onContentChange, readOnly, grid = 4 }) {
  const items = content.items ?? [];
  const isSix = grid === 6;
  const title = resolvedHeadline(content.title ?? { lines: ['KEY LEARNINGS'] }, settings);
  const onTitleChange = (nextTitle) => {
    onContentChange({
      ...content,
      title: resolveHeadlineIndents(nextTitle, settings),
    });
  };

  const updateItem = (index, patch) => {
    const next = [...items];
    next[index] = { ...next[index], ...patch };
    onContentChange({ ...content, items: next });
  };

  return (
    <section
      className={`pilulka-key-learnings${isSix ? ' pilulka-key-learnings--six' : ''}`}
      data-section="key-learnings"
    >
      <div className="pilulka-key-learnings__inner">
        <EditableHeadline
          as="h2"
          headline={title}
          onChange={onTitleChange}
          readOnly={readOnly}
          className="pilulka-key-learnings__title"
        />
        <div className={`pilulka-key-learnings__grid${isSix ? ' pilulka-key-learnings__grid--six' : ''}`}>
          {items.map((item, i) => (
            <article key={i} className="pilulka-key-learnings__col">
              <h3 className="pilulka-key-learnings__col-title">
                {(item.title ?? ['', '']).map((line, li) => (
                  <EditableText
                    key={li}
                    as="span"
                    className="pilulka-key-learnings__col-title-line"
                    value={line}
                    readOnly={readOnly}
                    onChange={(text) => {
                      const title = [...(item.title ?? ['', ''])];
                      title[li] = text;
                      updateItem(i, { title });
                    }}
                  />
                ))}
              </h3>
              <EditableText
                as="p"
                className="pilulka-key-learnings__col-body text-body"
                value={item.body}
                readOnly={readOnly}
                onChange={(body) => updateItem(i, { body })}
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function WysiwygSection({
  block,
  selected,
  onSelect,
  onContentChange,
  toolbar,
}) {
  const readOnly = false;
  const props = blockToProps(block);
  const stackLayout = block.settings?.stackLayout;
  const layout = block.settings?.layout ?? block.content?.layout ?? 'default';

  const handleContent = (content) => {
    if (!readOnly) onContentChange(block.id, content);
  };

  let section = null;

  if (block.type === 'intro') {
    section = (
      <IntroSection
        content={block.content ?? {}}
        settings={block.settings ?? {}}
        onContentChange={handleContent}
        readOnly={readOnly}
        stackLayout={stackLayout}
        layout={layout}
      />
    );
  } else if (block.type === 'zigzag') {
    section = (
      <ZigzagSection
        content={block.content ?? {}}
        settings={block.settings ?? {}}
        onContentChange={handleContent}
        readOnly={readOnly}
        stackLayout={stackLayout}
        layout={layout}
      />
    );
  } else if (block.type === 'key-learnings' || block.type === 'key-learnings-six') {
    section = (
      <KeyLearningsSection
        content={block.content ?? {}}
        settings={block.settings ?? {}}
        onContentChange={handleContent}
        readOnly={readOnly}
        grid={props?.grid ?? 4}
      />
    );
  } else if (block.type === 'cta') {
    section = <CaseCtaSection {...props} />;
  }

  if (!section) return null;

  return (
    <div
      className={`wysiwyg-section${selected ? ' is-selected' : ''}`}
      style={{ background: block.settings?.bg ?? '#006858' }}
      onClick={() => onSelect(block.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelect(block.id)}
    >
      {selected && toolbar}
      {section}
    </div>
  );
}
