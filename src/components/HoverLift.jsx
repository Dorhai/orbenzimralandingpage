import { motion } from 'framer-motion';
import { useMotionSafe } from '@/lib/animations';

/** Wraps any card/block with a subtle lift on hover */
const HoverLift = ({ children, className = '' }) => {
  const { hoverLift } = useMotionSafe();

  return (
    <motion.div whileHover={hoverLift} className={className}>
      {children}
    </motion.div>
  );
};

export default HoverLift;
