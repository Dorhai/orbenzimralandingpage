import { HORIZONTAL_RECTS } from '@/lib/dumbbellPieces';

/** Horizontal dumbbell mark for Logo lockup */
export function DumbbellMark(props) {
  return (
    <svg viewBox="0 0 120 48" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
      {HORIZONTAL_RECTS.map((r, i) => (
        <rect key={i} {...r} />
      ))}
    </svg>
  );
}
