import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import { headlineContainer, useMotionSafe } from '@/lib/animations';
import coachCutout from '../assets/coach-cutout.png';
import heroGymBg from '../assets/hero-gym-bg.png';
import HeroCta from './HeroCta';

const Hero = () => {
  const { headlineLine, coachEntrance, fadeUp } = useMotionSafe();

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Gym background */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroGymBg}
          alt={siteContent.hero.backgroundImageAlt}
          className="absolute inset-0 w-full h-full object-cover scale-105 blur-[4px]"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/55" aria-hidden />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center pointer-events-none pt-[4.75rem] sm:pt-[5.5rem] pb-6">
        <motion.div
          className="hero-headline w-full shrink-0"
          variants={headlineContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p className="hero-headline-line1" variants={headlineLine}>
            {siteContent.hero.headlineLine1}
          </motion.p>
          <motion.p className="hero-headline-line2 hero-text-overlap" variants={headlineLine}>
            {siteContent.hero.headlineLine2}
          </motion.p>
        </motion.div>

        <div className="mt-3 flex w-full flex-col items-center sm:mt-4 lg:mt-0 lg:min-h-0 lg:flex-1 lg:justify-end">
          <motion.div
            className="coach-cutout-glow"
            variants={coachEntrance}
            initial="hidden"
            animate="visible"
          >
            <img
              src={coachCutout}
              alt={siteContent.hero.coachImageAlt}
              className="h-[min(58vh,36rem)] sm:h-[min(65vh,40rem)] md:h-[min(75vh,42rem)] w-auto max-w-[92vw] object-contain"
              draggable={false}
              loading="eager"
            />
          </motion.div>

          <motion.div
            className="mt-8 mb-2 sm:mt-6 lg:mt-5 lg:mb-1"
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
