import { motion } from 'framer-motion';
import { fadeUp, fadeUpReduced, viewportOnce, motionVariant, useMotionSafe } from '@/lib/animations';

/*
 * Reveal – single element fade-up on scroll into view.
 * Respects reduced-motion preferences.
 */
const Reveal = ({ children, delay = 0, className = '', variants = null }) => {
  const { reduced } = useMotionSafe();
  const defaultVariants = motionVariant(reduced, fadeUp, fadeUpReduced);
  const activeVariants = variants || defaultVariants;

  return (
    <motion.div
      className={className}
      variants={activeVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
