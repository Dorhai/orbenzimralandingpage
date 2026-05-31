import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import { Card } from '@/components/ui/card';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import StaggerText from './StaggerText';
import { useMotionSafe, EASE_OUT, clipReveal, clipRevealReduced, motionVariant, viewportOnce } from '@/lib/animations';

const Gallery = () => {
  const { reduced, scaleIn } = useMotionSafe();
  const imageHover = reduced ? undefined : { scale: 1.06, transition: { duration: 0.5, ease: EASE_OUT } };
  const clipVariant = motionVariant(reduced, clipReveal, clipRevealReduced);

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <StaggerText text={siteContent.gallery.title} className="text-4xl font-bold text-gray-900 mb-4" />
        </div>

        <StaggerReveal className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" stagger={0.08} childVariant={scaleIn}>
          {siteContent.gallery.images.map((imgUrl, idx) => (
            <HoverLift key={idx}>
              <Card className="aspect-square overflow-hidden p-0">
                <motion.div
                  className="w-full h-full"
                  variants={clipVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                >
                  <motion.img
                    src={imgUrl}
                    alt={`תמונת גלריה ${idx + 1}`}
                    className="w-full h-full object-cover"
                    whileHover={imageHover}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.div>
              </Card>
            </HoverLift>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Gallery;
