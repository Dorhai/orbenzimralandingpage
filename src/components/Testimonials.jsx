import { Quote } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { Card, CardContent } from '@/components/ui/card';
import Reveal from './Reveal';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import TiltCard from './TiltCard';
import { useMotionSafe } from '@/lib/animations';

const Testimonials = () => {
  const { scaleIn } = useMotionSafe();

  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            {siteContent.testimonials.title}
          </h2>
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.12} childVariant={scaleIn}>
          {siteContent.testimonials.items.map((testimonial, idx) => (
            <HoverLift key={idx}>
              <TiltCard className="h-full">
                <Card className="h-full text-start relative">
                  <CardContent>
                    <Quote className="w-10 h-10 text-border absolute top-6 start-6" />
                    <div className="relative z-10 pt-8">
                      <p className="text-muted-foreground italic mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </p>
                      <div>
                        <h4 className="font-bold text-foreground">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
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

export default Testimonials;
