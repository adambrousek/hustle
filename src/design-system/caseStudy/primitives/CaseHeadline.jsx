export default function CaseHeadline({
  lines,
  lineIndents,
  as: Tag = 'h2',
  uniform = false,
  className = '',
  ...rest
}) {
  return (
    <Tag
      className={`claim pilulka-chapter__headline${uniform ? ' pilulka-chapter__headline--uniform' : ''}${className ? ` ${className}` : ''}`}
      data-lines={lines.length}
      {...rest}
    >
      {lines.map((line, i) => (
        <span
          key={`${line}-${i}`}
          className="claim-line"
          style={{ '--claim-indent': lineIndents?.[i] ?? '0' }}
        >
          {line}
        </span>
      ))}
    </Tag>
  );
}
