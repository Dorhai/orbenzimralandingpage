import { Children } from 'react';
import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeUp,
  fadeUpReduced,
  viewportOnce,
  motionVariant,
} from '@/lib/animations';
import { useMotionSafe } from '@/lib/animations';

/*
 * StaggerReveal – container that staggers its direct children on scroll.
 * Each child fades up sequentially (Programs, Pricing, etc.).
 */
const StaggerReveal = ({ children, className = '', stagger = 0.1, delayChildren = 0, childVariant = null }) => {
  const { reduced } = useMotionSafe();
  const defaultChildVariants = motionVariant(reduced, fadeUp, fadeUpReduced);
  const activeChildVariants = childVariant || defaultChildVariants;

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
    >
      {Children.map(children, (child) =>
        child ? (
          <motion.div key={child.key} variants={activeChildVariants} className="h-full">
            {child}
          </motion.div>
        ) : null
      )}
    </motion.div>
  );
};

export default StaggerReveal;
