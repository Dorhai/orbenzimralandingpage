import { motion } from 'framer-motion';
import { useMotionSafe } from '@/lib/animations';

const StaggerText = ({ text, className = '', stagger = 0.05 }) => {
  const { reduced } = useMotionSafe();
  const words = text.split(' ').filter(Boolean);

  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: 0.04 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: { duration: 0.35, ease: 'easeOut' },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={`overflow-visible text-center ${className}`}
      dir="rtl"
    >
      {words.map((word, idx) => (
        <motion.span variants={child} key={idx} className="inline-block">
          {word}
          {idx < words.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggerText;
