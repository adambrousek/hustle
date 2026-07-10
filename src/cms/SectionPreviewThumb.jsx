import { blockToProps, getSectionType } from './sectionTypes';
import { sanitizePreviewContent } from './previewContent';

export default function SectionPreviewThumb({ type, content = {}, settings = {}, previewBg }) {
  const typeDef = getSectionType(type);
  if (!typeDef) {
    return <div className="section-preview section-preview--empty" />;
  }

  const Component = typeDef.component;
  const previewContent = sanitizePreviewContent(content);
  const props = blockToProps({ type, content: previewContent, settings });
  const bg = previewBg ?? settings.bg ?? '#006858';

  return (
    <div className="section-preview" style={{ background: bg }}>
      <div className="section-preview__viewport">
        <div className="section-preview__frame pilulka-case pilulka-case--zigzag section-preview-canvas">
          <Component {...props} />
        </div>
      </div>
    </div>
  );
}
