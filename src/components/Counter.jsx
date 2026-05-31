import { useEffect, useRef } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';

const Counter = ({ from = 0, to, duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  
  const springValue = useSpring(from, {
    duration: duration * 1000,
    bounce: 0,
  });

  const rounded = useTransform(springValue, (latest) => {
    // Determine if 'to' has non-numeric characters (like +)
    const targetIsString = typeof to === 'string';
    const targetNum = targetIsString ? parseInt(to.replace(/\D/g, ''), 10) : to;
    const suffix = targetIsString ? to.replace(/\d/g, '') : '';
    
    // Only display number during transition, append suffix at the end if you want
    // Actually, simpler to just format the number and append the suffix
    const currentNum = Math.round(latest);
    return `${currentNum}${suffix}`;
  });

  useEffect(() => {
    const targetIsString = typeof to === 'string';
    const targetNum = targetIsString ? parseInt(to.replace(/\D/g, ''), 10) : to;
    if (isInView) {
      springValue.set(targetNum);
    } else {
      springValue.set(from);
    }
  }, [isInView, springValue, to, from]);

  return <motion.span ref={ref}>{rounded}</motion.span>;
};

export default Counter;
