export default function CaseSubhead({ lines, as: Tag = 'h3' }) {
  const titleLines = (Array.isArray(lines) ? lines : [lines]).filter(Boolean);
  if (!titleLines.length) return null;

  return (
    <Tag className="pilulka-key-learnings__col-title">
      {titleLines.map((line) => (
        <span key={line} className="pilulka-key-learnings__col-title-line">
          {line}
        </span>
      ))}
    </Tag>
  );
}
