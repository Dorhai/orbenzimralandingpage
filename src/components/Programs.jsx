import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import TiltCard from './TiltCard';
import StaggerText from './StaggerText';
import { useMotionSafe, clipReveal, clipRevealReduced, motionVariant, viewportOnce } from '@/lib/animations';

const Programs = () => {
  const { reduced } = useMotionSafe();
  const imageHover = reduced ? undefined : { scale: 1.05, transition: { duration: 0.5, ease: 'easeOut' } };
  const clipVariant = motionVariant(reduced, clipReveal, clipRevealReduced);

  return (
    <section id="programs" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <StaggerText text={siteContent.programs.title} className="text-4xl font-bold text-gray-900 mb-4" />
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {siteContent.programs.items.map((program, idx) => (
            <HoverLift key={idx}>
              <TiltCard className="h-full">
                <Card className="overflow-hidden p-0 gap-0 h-full group">
                  <div className="h-48 overflow-hidden">
                    <motion.div
                      className="w-full h-full"
                      variants={clipVariant}
                      initial="hidden"
                      whileInView="visible"
                      viewport={viewportOnce}
                    >
                      <motion.img
                        src={program.imageUrl}
                        alt={program.title}
                        className="w-full h-full object-cover"
                        whileHover={imageHover}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                      />
                    </motion.div>
                  </div>
                  <CardHeader className="pt-6">
                    <CardTitle className="text-xl text-start">{program.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-6 pt-2">
                    <p className="text-gray-600 leading-relaxed text-start">{program.description}</p>
                  </CardContent>
                </Card>
              </TiltCard>
            </HoverLift>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Programs;
