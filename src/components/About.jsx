import { siteContent } from '../data/siteContent';

import Reveal from './Reveal';

import StaggerText from './StaggerText';

import { useMotionSafe } from '@/lib/animations';

const renderStoryLine = (text, redLine) =>
  redLine ? <span className="about-story-highlight">{text}</span> : text;

const AboutStoryLines = ({ lines }) => (
  <>
    {lines.map((line, idx) => (
      <Reveal key={idx} delay={idx * 0.04}>
        <p
          className="about-story-line text-center"
          style={{ maxWidth: `min(${line.maxWidth}, 92vw)` }}
        >
          {renderStoryLine(line.text, line.redLine)}
        </p>
      </Reveal>
    ))}
  </>
);



const portraitClasses =

  'aspect-[3/4] w-[38vw] max-w-[9.5rem] sm:w-44 sm:max-w-none md:w-60 lg:w-[320px] xl:w-[380px] shrink-0 overflow-hidden rounded-[var(--radius)] border border-border bg-secondary shadow-xl shadow-black/40';



const AboutPortrait = ({ src, alt, className = '' }) => (

  <div className={`${portraitClasses} ${className}`}>

    <img

      src={src}

      alt={alt}

      className="h-full w-full object-cover object-center"

      loading="lazy"

      draggable={false}

    />

  </div>

);



/** Before/after portraits slide in from the sides when the about section enters the viewport */

const AboutPortraitReveal = ({ side, delay = 0, className = '', children }) => {

  const { slideInLeft, slideInRight } = useMotionSafe();

  const variants = side === 'before' ? slideInLeft : slideInRight;



  return (

    <Reveal delay={delay} className={className} variants={variants}>

      {children}

    </Reveal>

  );

};



const About = () => {

  const { title, beforeImage, afterImage, beforeImageAlt, afterImageAlt, lines } =

    siteContent.about;



  return (

    <section id="about" className="section-padding overflow-hidden bg-card">

      <div className="mx-auto max-w-7xl px-6">

        <div className="section-intro overflow-visible text-center">

          <StaggerText

            text={title}

            className="about-story-title section-heading text-foreground"

          />

        </div>



        {/* Mobile / tablet: stacked editorial layout */}

        <div className="lg:hidden">

          <div className="about-story-block mx-auto max-w-4xl" dir="rtl">

            <AboutStoryLines lines={lines} />

          </div>



          <div

            className="mt-12 flex items-end justify-between gap-2 px-2 sm:mt-14 sm:gap-4 sm:px-4"

            dir="ltr"

          >

            <AboutPortraitReveal side="before" delay={0.1}>

              <AboutPortrait

                src={beforeImage}

                alt={beforeImageAlt}

                className="translate-y-2 -rotate-6 sm:-rotate-[8deg]"

              />

            </AboutPortraitReveal>

            <AboutPortraitReveal side="after" delay={0.2}>

              <AboutPortrait

                src={afterImage}

                alt={afterImageAlt}

                className="-translate-y-4 rotate-6 sm:rotate-[8deg]"

              />

            </AboutPortraitReveal>

          </div>

        </div>



        {/* Desktop: before (left) · centered text · after (right) — ltr grid so sides stay visual L/R */}

        <div

          className="mx-auto hidden min-h-[720px] max-w-7xl lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-6 xl:gap-10"

          dir="ltr"

        >

          <AboutPortraitReveal side="before" delay={0.1} className="flex justify-end pe-2 xl:pe-4">

            <AboutPortrait

              src={beforeImage}

              alt={beforeImageAlt}

              className="-rotate-[10deg]"

            />

          </AboutPortraitReveal>



          <div className="about-story-block relative z-10 justify-center px-2" dir="rtl">

            <AboutStoryLines lines={lines} />

          </div>



          <AboutPortraitReveal side="after" delay={0.15} className="flex justify-start ps-2 xl:ps-4">

            <AboutPortrait

              src={afterImage}

              alt={afterImageAlt}

              className="rotate-[10deg]"

            />

          </AboutPortraitReveal>

        </div>

      </div>

    </section>

  );

};



export default About;

