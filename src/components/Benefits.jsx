import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { Card, CardContent } from '@/components/ui/card';
import Reveal from './Reveal';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import StaggerText from './StaggerText';

const AnimatedIcon = (motion.create || motion)(CheckCircle2);

const Benefits = () => {
  return (
    <section id="benefits" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-intro text-center">
          <StaggerText text={siteContent.benefits.title} className="section-heading text-foreground" />
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto" stagger={0.1}>
          {siteContent.benefits.items.map((benefit, idx) => (
            <HoverLift key={idx}>
              <Card className="h-full">
                <CardContent className="flex items-start gap-4">
                  <AnimatedIcon
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: false }}
                    className="w-6 h-6 text-primary shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2 text-start">{benefit.title}</h3>
                    <p className="text-muted-foreground text-start leading-relaxed">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            </HoverLift>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Benefits;
