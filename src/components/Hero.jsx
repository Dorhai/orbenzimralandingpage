import { siteContent } from '../data/siteContent';
import coachCutout from '../assets/coach-cutout.png';
import heroGymBg from '../assets/hero-gym-bg.png';
import HeroCta from './HeroCta';

const Hero = () => {
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
        <div className="hero-headline w-full shrink-0">
          <p className="hero-headline-line1">{siteContent.hero.headlineLine1}</p>
          <p className="hero-headline-line2 hero-text-overlap">
            {siteContent.hero.headlineLine2}
          </p>
        </div>

        <div className="mt-3 flex w-full flex-col items-center sm:mt-4 lg:mt-0 lg:min-h-0 lg:flex-1 lg:justify-end">
          <div className="coach-cutout-glow">
            <img
              src={coachCutout}
              alt={siteContent.hero.coachImageAlt}
              className="h-[min(58vh,36rem)] sm:h-[min(65vh,40rem)] md:h-[min(75vh,42rem)] w-auto max-w-[92vw] object-contain"
              draggable={false}
              loading="eager"
            />
          </div>
          <div className="mt-8 mb-2 sm:mt-6 lg:mt-5 lg:mb-1">
            <HeroCta />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
