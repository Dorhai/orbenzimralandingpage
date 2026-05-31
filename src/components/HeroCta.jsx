import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import { useMotionSafe } from '@/lib/animations';

const HeroCta = () => {
  const { reduced, hoverScaleSubtle } = useMotionSafe();

  return (
    <motion.a
      href="#contact"
      className={`hero-cta group shrink-0 ${reduced ? 'hero-cta--static' : ''}`}
      whileHover={hoverScaleSubtle}
    >
      <span className="hero-cta-ring" aria-hidden />
      <span className="hero-cta-label">{siteContent.hero.primaryCta}</span>
    </motion.a>
  );
};

export default HeroCta;
