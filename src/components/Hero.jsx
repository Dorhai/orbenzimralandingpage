import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

import { siteContent } from '../data/siteContent';

import { headlineContainer, useMotionSafe } from '@/lib/animations';

import HeroCta from './HeroCta';

const HERO_BG = '/images/transformations/dor_zinor.png';
const IMAGE_ASPECT = 2750 / 1536;

const getHeroBgFit = (baseDpr, viewportWidth, viewportHeight) => {
  const browserZoom = window.devicePixelRatio / baseDpr;
  const isMobile = viewportWidth < 640;
  const isDesktop = viewportWidth >= 1024;

  const heightFitWidth = viewportHeight * IMAGE_ASPECT;
  let viewportScale = 1;

  if (heightFitWidth < viewportWidth) {
    viewportScale = viewportWidth / heightFitWidth;
  }

  if (isMobile) {
    viewportScale *= 1.06;
  } else if (isDesktop) {
    viewportScale *= 0.98;
  }

  return {
    scale: browserZoom * viewportScale,
    positionX: '50%',
    positionY: isMobile ? '36%' : isDesktop ? '44%' : '40%',
  };
};

const Hero = () => {
  const { headlineLine, fadeUp } = useMotionSafe();
  const baseDprRef = useRef(null);
  const [heroBgFit, setHeroBgFit] = useState({
    scale: 1,
    positionX: '50%',
    positionY: '42%',
  });

  useEffect(() => {
    if (baseDprRef.current === null) {
      baseDprRef.current = window.devicePixelRatio;
    }

    const updateHeroFit = () => {
      const baseDpr = baseDprRef.current ?? window.devicePixelRatio;
      const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
      const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

      setHeroBgFit(getHeroBgFit(baseDpr, viewportWidth, viewportHeight));
    };

    updateHeroFit();
    window.addEventListener('resize', updateHeroFit);
    window.visualViewport?.addEventListener('resize', updateHeroFit);
    window.visualViewport?.addEventListener('scroll', updateHeroFit);

    return () => {
      window.removeEventListener('resize', updateHeroFit);
      window.visualViewport?.removeEventListener('resize', updateHeroFit);
      window.visualViewport?.removeEventListener('scroll', updateHeroFit);
    };
  }, []);

  return (
    <section className="relative min-h-svh overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden bg-black">
        <img
          src={HERO_BG}
          width={2750}
          height={1536}
          alt={siteContent.hero.backgroundImageAlt}
          className="hero-bg-image"
          style={{
            '--hero-bg-scale': heroBgFit.scale,
            '--hero-bg-position-x': heroBgFit.positionX,
            '--hero-bg-position-y': heroBgFit.positionY,
          }}
          loading="eager"
          fetchPriority="high"
          decoding="sync"
        />

        <div className="absolute inset-0 bg-black/40" aria-hidden />
      </div>

      <div className="relative z-10 flex min-h-svh flex-col items-center pointer-events-none pt-[4.75rem] sm:pt-[5.5rem] pb-6">
        <motion.h1
          className="hero-headline w-full shrink-0"
          variants={headlineContainer}
          initial="hidden"
          animate="visible"
        >
          <span className="sr-only">
            {siteContent.gym.name} – {siteContent.hero.label}. {siteContent.hero.subtitle}{' '}
          </span>

          <motion.span className="hero-headline-line1" variants={headlineLine}>
            {siteContent.hero.headlineLine1}
          </motion.span>

          <motion.span className="hero-headline-line2 hero-text-overlap" variants={headlineLine}>
            {siteContent.hero.headlineLine2}
          </motion.span>
        </motion.h1>

        <div className="flex w-full flex-1 flex-col items-center justify-end pb-2 sm:pb-4">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.75 }}
          >
            <HeroCta />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
