import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import { useMotionSafe } from '@/lib/animations';

/**
 * Infinite horizontal ticker of short keywords.
 * Content is duplicated so the loop is seamless; static when reduced motion is on.
 */
const Marquee = ({ items = siteContent.marquee.items, duration = 28 }) => {
  const { reduced } = useMotionSafe();
  const loop = [...items, ...items];

  return (
    <div className="bg-primary text-primary-foreground py-6 overflow-hidden">
      <motion.div
        className="flex w-max gap-12 whitespace-nowrap"
        animate={reduced ? undefined : { x: ['0%', '-50%'] }}
        transition={reduced ? undefined : { duration, repeat: Infinity, ease: 'linear' }}
      >
        {loop.map((item, idx) => (
          <span key={idx} className="flex items-center gap-12 text-2xl font-bold tracking-wide">
            <span>{item}</span>
            <span aria-hidden className="text-primary-foreground/30">•</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default Marquee;
