import CaseMediaAsset from './CaseMediaAsset';
import { getStackLayoutClass } from '../mediaStackLayouts';

const STACK_CLASSES = ['proof-img--a', 'proof-img--b', 'proof-img--c'];

export default function CaseMediaStack({
  items,
  visualVariant = 'pilulka',
  stackLayout = 'stagger',
  stackType = 'zigzag',
}) {
  if (!items?.length) return null;

  const layoutClass = getStackLayoutClass(stackLayout, stackType);

  return (
    <div className="pilulka-chapter__media-wrap">
      <div
        className={`proof-visual proof-visual--${visualVariant} pilulka-chapter__stack${layoutClass}`}
        data-stack-layout={stackLayout}
        aria-hidden="true"
      >
        {items.map((item, index) => (
          <CaseMediaAsset
            key={item.src}
            item={item}
            className={`proof-img ${item.className ?? STACK_CLASSES[index % STACK_CLASSES.length]}`}
          />
        ))}
      </div>
    </div>
  );
}
