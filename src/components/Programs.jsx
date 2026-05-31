import { Dumbbell, Flame, User, Users } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import TiltCard from './TiltCard';
import StaggerText from './StaggerText';

const programIcons = [User, Dumbbell, Flame, Users];

const Programs = () => {
  return (
    <section id="programs" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-intro text-center">
          <StaggerText text={siteContent.programs.title} className="section-heading text-foreground" />
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {siteContent.programs.items.map((program, idx) => {
            const Icon = programIcons[idx] ?? Dumbbell;
            return (
              <HoverLift key={idx}>
                <TiltCard className="h-full">
                  <Card className="h-full gap-0 py-0">
                    <CardHeader className="gap-4 pt-6 pb-0">
                      <div
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                        aria-hidden
                      >
                        <Icon className="h-6 w-6" strokeWidth={2} />
                      </div>
                      <CardTitle className="text-xl text-start">{program.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="pb-6 pt-2">
                      <p className="text-muted-foreground leading-relaxed text-start">{program.description}</p>
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

export default Programs;
