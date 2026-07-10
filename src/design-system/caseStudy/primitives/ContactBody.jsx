export default function ContactBody({ lines = [], children }) {
  if (children) {
    return <div className="contact-block__body text-body">{children}</div>;
  }

  const items = lines.filter(Boolean);
  if (!items.length) return null;

  return (
    <p className="contact-block__body text-body">
      {items.map((line, i) => (
        <span key={`${line}-${i}`}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </p>
  );
}
