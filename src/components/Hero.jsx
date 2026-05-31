import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import ScatterDumbbell from './ScatterDumbbell';
import MagneticWrapper from './MagneticWrapper';
import { Button } from '@/components/ui/button';
import {
  heroContainer,
  heroItem,
  headlineContainer,
  headlineLine,
  floatAnimation,
  spinAnimation,
  motionVariant,
  fadeUpReduced,
} from '@/lib/animations';
import { useMotionSafe } from '@/lib/animations';

const Hero = () => {
  const heroRef = useRef(null);
  const { reduced, hoverScaleSubtle, tapScale } = useMotionSafe();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const progress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 28,
    mass: 0.4,
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 80]);
  const scrollScale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 0.88]);

  const resolvedHeroContainer = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : heroContainer;

  const resolvedHeroItem = motionVariant(reduced, heroItem, fadeUpReduced);
  const resolvedHeadlineLine = motionVariant(reduced, headlineLine, fadeUpReduced);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 to-gray-200/50 flex flex-col pt-20"
    >
      {/* Realistic horizontal dumbbell — spin, float, parallax, scatter */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0">
        <motion.div
          style={{ y: parallaxY, scale: scrollScale }}
          className="relative w-[min(92vw,28rem)] md:w-[40rem] lg:w-[52rem]"
        >
          <motion.div
            animate={!reduced ? { rotate: 360 } : undefined}
            transition={spinAnimation}
            style={{ transformOrigin: 'center center' }}
          >
            <motion.div
              animate={!reduced ? floatAnimation : undefined}
              className="w-full"
            >
              <ScatterDumbbell
                scrollProgress={progress}
                reducedMotion={reduced}
                className="w-full"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        <motion.div
          className="text-center px-6 max-w-4xl mx-auto -mt-20"
          variants={resolvedHeroContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            variants={resolvedHeroItem}
            className="text-sm md:text-base font-semibold text-gray-600 tracking-widest mb-6"
          >
            {siteContent.hero.label}
          </motion.p>

          <motion.h1
            variants={headlineContainer}
            initial="hidden"
            animate="visible"
            dir="rtl"
            className="flex flex-col items-center justify-center font-bold tracking-tight leading-tight mb-8"
          >
            <motion.span
              variants={resolvedHeadlineLine}
              className="text-5xl md:text-6xl lg:text-7xl text-gray-500"
            >
              {siteContent.hero.headlineLine1}
            </motion.span>
            <motion.span
              variants={resolvedHeadlineLine}
              className="text-5xl md:text-6xl lg:text-7xl text-[#202A36]"
            >
              {siteContent.hero.headlineLine2}
            </motion.span>
          </motion.h1>

          <motion.p
            variants={resolvedHeroItem}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {siteContent.hero.subtitle}
          </motion.p>

          <motion.div
            variants={resolvedHeroItem}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticWrapper>
              <Button asChild size="lg" className="relative overflow-hidden group rounded-full w-full sm:w-auto px-8">
                <motion.a
                  href="#contact"
                  whileHover={hoverScaleSubtle}
                  whileTap={tapScale}
                >
                  <span className="relative z-10">{siteContent.hero.primaryCta}</span>
                  {!reduced && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
                    />
                  )}
                </motion.a>
              </Button>
            </MagneticWrapper>
            <MagneticWrapper>
              <Button asChild size="lg" variant="secondary" className="relative overflow-hidden group rounded-full w-full sm:w-auto px-8">
                <motion.a
                  href="#programs"
                  whileHover={hoverScaleSubtle}
                  whileTap={tapScale}
                >
                  <span className="relative z-10">{siteContent.hero.secondaryCta}</span>
                  {!reduced && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -translate-x-[150%] -skew-x-12 bg-gradient-to-r from-transparent via-black/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]"
                    />
                  )}
                </motion.a>
              </Button>
            </MagneticWrapper>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
