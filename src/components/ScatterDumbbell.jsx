import { useEffect, useState } from 'react';
import { useMotionValue, animate } from 'framer-motion';
import DumbbellSvgPiece from './DumbbellSvgPiece';
import {
  VIEWBOX_HORIZONTAL,
  HORIZONTAL_PIECES,
  getScatterScale,
} from '@/lib/dumbbellPieces';

/**
 * Realistic horizontal dumbbell — circular plates, bar, collars.
 * Assembles on load, scatters on scroll.
 */
function ScatterDumbbell({
  scrollProgress,
  className = '',
  reducedMotion = false,
}) {
  const entranceProgress = useMotionValue(reducedMotion ? 1 : 0);
  const [scatterScale, setScatterScale] = useState(() =>
    getScatterScale(typeof window !== 'undefined' ? window.innerWidth : 768)
  );

  useEffect(() => {
    const update = () => setScatterScale(getScatterScale(window.innerWidth));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      entranceProgress.set(1);
      return;
    }
    const controls = animate(entranceProgress, 1, {
      duration: 1.1,
      ease: [0.25, 0.1, 0.25, 1],
    });
    return () => controls.stop();
  }, [reducedMotion, entranceProgress]);

  return (
    <div className={`relative ${className}`} style={{ aspectRatio: '200 / 72' }}>
      <div
        className="absolute inset-0 -z-10 blur-3xl rounded-full scale-110 opacity-[0.12] bg-[#202A36]"
        aria-hidden
      />

      <svg
        viewBox={VIEWBOX_HORIZONTAL}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
        aria-hidden
      >
        {HORIZONTAL_PIECES.map((piece) => (
          <DumbbellSvgPiece
            key={piece.id}
            shape={piece.shape}
            geometry={piece.geometry}
            gradientId={piece.gradientId}
            scatter={piece.scatter}
            scrollRange={piece.scrollRange}
            scrollProgress={scrollProgress}
            entranceProgress={entranceProgress}
            entranceDelay={piece.entranceDelay}
            scatterScale={scatterScale}
            reducedMotion={reducedMotion}
          />
        ))}
      </svg>
    </div>
  );
}

export default ScatterDumbbell;
