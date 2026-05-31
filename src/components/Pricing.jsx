import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Check } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Reveal from './Reveal';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import TiltCard from './TiltCard';
import { useMotionSafe } from '@/lib/animations';

const Pricing = () => {
  const { hoverScaleSubtle, reduced } = useMotionSafe();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : ['-20%', '20%']);

  return (
    <section ref={sectionRef} id="pricing" className="section-padding bg-card relative overflow-hidden">
      {/* Decorative Parallax Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3"
      />
      <motion.div
        style={{ y: backgroundY }}
        className="absolute bottom-0 left-0 w-[30rem] h-[30rem] bg-primary/5 rounded-full blur-3xl pointer-events-none translate-y-1/3 -translate-x-1/4"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal className="section-intro text-center">
          <h2 className="section-heading text-foreground">
            {siteContent.pricing.title}
          </h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-stretch" stagger={0.12}>
          {siteContent.pricing.plans.map((plan, idx) => {
            const isMiddle = idx === 1;

            return (
              <HoverLift key={idx}>
                <TiltCard className="h-full" max={6}>
                  <Card
                    className={`h-full text-start flex flex-col relative ${
                      isMiddle ? 'border-primary border-2 shadow-xl lg:-mt-4 lg:mb-4' : ''
                    }`}
                  >
                    {isMiddle && (
                      <Badge className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        מומלץ
                      </Badge>
                    )}

                    <CardHeader>
                      <CardTitle className="text-2xl">{plan.name}</CardTitle>
                      <p className="text-muted-foreground">{plan.description}</p>
                    </CardHeader>

                    <CardContent className="flex flex-col flex-1">
                      <div className="mb-6">
                        <span className="text-3xl sm:text-4xl font-bold text-foreground">₪{plan.price}</span>
                        <span className="text-muted-foreground"> / {plan.period}</span>
                      </div>

                      <ul className="flex-1 space-y-4 mb-8">
                        {plan.features.map((feature, featureIdx) => (
                          <li key={featureIdx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        asChild
                        variant={isMiddle ? 'default' : 'secondary'}
                        className="rounded-full w-full mt-auto"
                      >
                        <motion.a href="#contact" whileHover={hoverScaleSubtle}>
                          {plan.cta}
                        </motion.a>
                      </Button>
                    </CardContent>
                  </Card>
                </TiltCard>
              </HoverLift>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Pricing;
