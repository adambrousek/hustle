export function EditableText({
  value = '',
  onChange,
  readOnly = false,
  className = '',
  as: Tag = 'span',
  placeholder = 'Klikni pro úpravu…',
  style,
}) {
  if (readOnly) {
    return (
      <Tag className={className} style={style}>
        {value || placeholder}
      </Tag>
    );
  }

  return (
    <Tag
      className={`wysiwyg-editable ${className}`.trim()}
      style={style}
      contentEditable
      suppressContentEditableWarning
      data-placeholder={placeholder}
      onBlur={(e) => onChange(e.currentTarget.textContent.trim())}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && Tag !== 'p' && Tag !== 'div') {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}

export function EditableHeadline({
  headline,
  onChange,
  readOnly = false,
  as: Tag = 'h2',
  uniform = false,
  className = '',
}) {
  const lines = headline?.lines ?? ['Nadpis'];
  const lineIndents = headline?.lineIndents ?? [];

  const updateLine = (index, text) => {
    const next = [...lines];
    next[index] = text;
    onChange({ ...headline, lines: next, lineIndents });
  };

  return (
    <Tag
      className={`claim pilulka-chapter__headline${uniform ? ' pilulka-chapter__headline--uniform' : ''}${className ? ` ${className}` : ''}`}
      data-lines={lines.length}
    >
      {lines.map((line, i) => (
        <EditableText
          key={`line-${i}`}
          as="span"
          className="claim-line"
          value={line}
          readOnly={readOnly}
          placeholder={`Řádek ${i + 1}`}
          onChange={(text) => updateLine(i, text)}
          style={{ '--claim-indent': lineIndents[i] ?? '0' }}
        />
      ))}
    </Tag>
  );
}

export function EditableProse({ paragraphs = [], onChange, readOnly = false }) {
  const items = paragraphs.length ? paragraphs : [''];

  const updateParagraph = (index, text) => {
    const next = [...items];
    next[index] = text;
    onChange(next.filter(Boolean));
  };

  return (
    <div className="pilulka-chapter__prose">
      {items.map((text, i) => (
        <EditableText
          key={`p-${i}`}
          as="p"
          className="text-body"
          value={text}
          readOnly={readOnly}
          placeholder="Text odstavce…"
          onChange={(val) => updateParagraph(i, val)}
        />
      ))}
      {!readOnly && (
        <button
          type="button"
          className="wysiwyg-add-line"
          onClick={() => onChange([...items, ''])}
        >
          + Odstavec
        </button>
      )}
    </div>
  );
}
