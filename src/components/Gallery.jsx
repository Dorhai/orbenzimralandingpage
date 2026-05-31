import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { siteContent } from '../data/siteContent';
import { Card } from '@/components/ui/card';
import StaggerText from './StaggerText';
const PX_PER_SECOND = 100;
const VIEWPORT_BUFFER = 520;

const GallerySlide = ({ src, label, alt, beforeLabel, afterLabel, imageFocus }) => {
  const isBefore = label === beforeLabel;
  const scale = imageFocus?.scale ?? 1;
  const objectPosition = imageFocus?.objectPosition ?? 'center';

  return (
    <Card className="shrink-0 w-52 sm:w-60 md:w-64 overflow-hidden p-0 border-border">
      <div className="relative aspect-[3/4] w-full bg-secondary">
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            objectPosition,
            transform: scale !== 1 ? `scale(${scale})` : undefined,
            transformOrigin: objectPosition,
          }}
          draggable={false}
          loading="lazy"
        />
        <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-center px-3 pt-3 pb-8 bg-gradient-to-b from-black/50 to-transparent">
          <span className="gallery-label text-xl sm:text-2xl leading-none text-primary">
            {isBefore ? beforeLabel : afterLabel}
          </span>
        </div>
      </div>
    </Card>
  );
};

const Gallery = () => {
  const { title, items, beforeLabel, afterLabel } = siteContent.gallery;
  const containerRef = useRef(null);
  const measureRef = useRef(null);
  const marqueeRef = useRef(null);
  const repetitionsRef = useRef(1);
  const [halfSlides, setHalfSlides] = useState([]);
  const buildTimerRef = useRef(null);

  const slides = useMemo(
    () =>
      items.flatMap((item, i) => [
        {
          src: item.before,
          label: beforeLabel,
          alt: `${beforeLabel} ${i + 1}`,
          imageFocus: item.beforeImageFocus,
        },
        {
          src: item.after,
          label: afterLabel,
          alt: `${afterLabel} ${i + 1}`,
          imageFocus: item.afterImageFocus,
        },
      ]),
    [items, beforeLabel, afterLabel]
  );

  const loopSlides = useMemo(
    () => (halfSlides.length > 0 ? [...halfSlides, ...halfSlides] : []),
    [halfSlides]
  );

  const buildHalf = useCallback(() => {
    const measureEl = measureRef.current;
    const containerEl = containerRef.current;
    if (!measureEl || slides.length === 0) return;

    const setWidth = measureEl.offsetWidth;
    if (setWidth === 0) return;

    const viewportWidth = containerEl?.clientWidth ?? window.innerWidth;
    const needed = Math.ceil((viewportWidth + VIEWPORT_BUFFER) / setWidth);
    const repetitions = Math.max(repetitionsRef.current, needed, 2);
    repetitionsRef.current = repetitions;

    const half = Array.from({ length: repetitions }, () => slides).flat();
    setHalfSlides(half);
  }, [slides]);

  useEffect(() => {
    const scheduleBuild = () => {
      if (buildTimerRef.current) clearTimeout(buildTimerRef.current);
      buildTimerRef.current = setTimeout(buildHalf, 300);
    };

    buildHalf();
    window.addEventListener('resize', scheduleBuild);
    const t = setTimeout(buildHalf, 1000);
    return () => {
      window.removeEventListener('resize', scheduleBuild);
      clearTimeout(t);
      if (buildTimerRef.current) clearTimeout(buildTimerRef.current);
    };
  }, [buildHalf]);

  useLayoutEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee || loopSlides.length === 0) return;

    const applyDuration = () => {
      const halfWidth = marquee.scrollWidth / 2;
      const durationSec = Math.max(14, halfWidth / PX_PER_SECOND);
      marquee.style.setProperty('--marquee-duration', `${durationSec}s`);
    };

    applyDuration();
    const ro = new ResizeObserver(applyDuration);
    ro.observe(marquee);
    return () => ro.disconnect();
  }, [loopSlides]);

  return (
    <section id="gallery" className="section-padding relative bg-background overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-10 md:mb-12">
        <div className="text-center">
          <StaggerText text={title} className="section-heading text-foreground" />
        </div>
      </div>

      <div className="pointer-events-none h-0 overflow-hidden" aria-hidden>
        <div ref={measureRef} className="flex gap-6 w-max opacity-0" dir="ltr">
          {slides.map((slide, idx) => (
            <GallerySlide
              key={`m-${idx}`}
              src={slide.src}
              label={slide.label}
              alt=""
              beforeLabel={beforeLabel}
              afterLabel={afterLabel}
              imageFocus={slide.imageFocus}
            />
          ))}
        </div>
      </div>

      <div ref={containerRef} className="relative w-full overflow-hidden" dir="ltr">
        {loopSlides.length > 0 && (
          <div ref={marqueeRef} className="flex w-max gap-6 gallery-marquee-inner">
            {loopSlides.map((slide, idx) => (
              <GallerySlide
                key={idx}
                src={slide.src}
                label={slide.label}
                alt={slide.alt}
                beforeLabel={beforeLabel}
                afterLabel={afterLabel}
                imageFocus={slide.imageFocus}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
