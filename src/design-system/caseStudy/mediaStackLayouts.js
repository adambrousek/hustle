export const ZIGZAG_STACK_LAYOUTS = [
  { id: 'stagger', label: 'Stagger' },
  { id: 'cascade', label: 'Cascade' },
  { id: 'fan', label: 'Fan' },
  { id: 'tight', label: 'Tight' },
];

export const INTRO_STACK_LAYOUTS = [
  { id: 'offset', label: 'Offset' },
  { id: 'wide', label: 'Wide' },
  { id: 'depth', label: 'Depth' },
];

export function getStackLayoutClass(stackLayout, type = 'zigzag') {
  if (!stackLayout) return '';
  const fallback = type === 'intro' ? 'offset' : 'stagger';
  if (stackLayout === fallback) return '';
  return ` pilulka-chapter__stack--${stackLayout}`;
}
