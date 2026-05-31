import { motion } from 'framer-motion';
import { useMotionSafe } from '@/lib/animations';

const StaggerText = ({ text, className = '', stagger = 0.05 }) => {
  const { reduced } = useMotionSafe();
  
  // If reduced motion is preferred, just return standard motion.div with a simple fade
  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.15 }}
        className={className}
      >
        {text}
      </motion.div>
    );
  }

  // Split text by words
  const words = text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.15 }}
      className={`flex flex-wrap justify-center ${className}`}
      dir="rtl"
    >
      {words.map((word, idx) => (
        <motion.span variants={child} key={idx} className="mr-[0.25em]">
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default StaggerText;
