import { motion, useTransform } from 'framer-motion';
import { DUMBBELL_FILL } from '@/lib/dumbbellPieces';

const REST_OPACITY = 0.32;
const SCATTER_OPACITY = 0.12;

function getTransformOrigin(shape, geometry) {
  if (shape === 'circle') {
    return `${geometry.cx}px ${geometry.cy}px`;
  }
  return `${geometry.x + geometry.width / 2}px ${geometry.y + geometry.height / 2}px`;
}

function PieceShape({ shape, geometry, gradientId }) {
  if (shape === 'circle') {
    const fill = gradientId ? `url(#${gradientId})` : DUMBBELL_FILL;
    return <circle cx={geometry.cx} cy={geometry.cy} r={geometry.r} fill={fill} />;
  }
  return <rect {...geometry} fill={DUMBBELL_FILL} />;
}

/**
 * One animatable SVG piece (circle plate or rect bar/collar).
 * Combines assemble-on-load + scroll scatter.
 */
function DumbbellSvgPiece({
  shape,
  geometry,
  gradientId,
  scatter,
  scrollRange,
  scrollProgress,
  entranceProgress,
  entranceDelay = 0,
  scatterScale,
  reducedMotion,
}) {
  const scaledDx = scatter.dx * scatterScale;
  const scaledDy = scatter.dy * scatterScale;

  const pieceEntrance = useTransform(entranceProgress, (p) => {
    if (reducedMotion) return 1;
    const adjusted = (p - entranceDelay) / Math.max(0.01, 1 - entranceDelay);
    return Math.max(0, Math.min(1, adjusted));
  });

  const scrollAmount = useTransform(scrollProgress, scrollRange, [0, 1]);

  const entranceX = useTransform(pieceEntrance, (p) => scaledDx * (1 - p));
  const entranceY = useTransform(pieceEntrance, (p) => scaledDy * (1 - p));
  const entranceRotate = useTransform(pieceEntrance, (p) => scatter.rotate * (1 - p));

  const scrollX = useTransform(scrollAmount, (s) => (reducedMotion ? 0 : scaledDx * s));
  const scrollY = useTransform(scrollAmount, (s) => (reducedMotion ? 0 : scaledDy * s));
  const scrollRotate = useTransform(scrollAmount, (s) => (reducedMotion ? 0 : scatter.rotate * s));

  const x = useTransform([entranceX, scrollX], ([ex, sx]) => ex + sx);
  const y = useTransform([entranceY, scrollY], ([ey, sy]) => ey + sy);
  const rotate = useTransform([entranceRotate, scrollRotate], ([er, sr]) => er + sr);

  const opacity = useTransform([pieceEntrance, scrollAmount], ([ep, sa]) => {
    if (reducedMotion) return REST_OPACITY;
    const scrollOp = REST_OPACITY - sa * (REST_OPACITY - SCATTER_OPACITY);
    const entranceMul = 0.55 + 0.45 * ep;
    return scrollOp * entranceMul;
  });

  return (
    <motion.g
      style={{
        x,
        y,
        rotate,
        opacity,
        transformOrigin: getTransformOrigin(shape, geometry),
      }}
    >
      <PieceShape shape={shape} geometry={geometry} gradientId={gradientId} />
    </motion.g>
  );
}

export default DumbbellSvgPiece;
