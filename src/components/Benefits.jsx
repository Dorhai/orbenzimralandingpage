import {
  Phone,
  Dumbbell,
  Utensils,
  Scale,
  Bell,
  Target,
  BookOpen,
  Video,
  User,
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import StaggerText from './StaggerText';

const benefitIcons = {
  Phone,
  Dumbbell,
  Utensils,
  Scale,
  Bell,
  Target,
  BookOpen,
  Video,
  User,
};

const Benefits = () => {
  return (
    <section id="benefits" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-intro text-center">
          <StaggerText as="h2" text={siteContent.benefits.title} className="section-heading text-foreground" />
        </div>

        <StaggerReveal className="flex flex-col gap-4 max-w-3xl mx-auto" stagger={0.08}>
          {siteContent.benefits.items.map((benefit, idx) => {
            const Icon = benefitIcons[benefit.icon] ?? Dumbbell;
            return (
              <HoverLift key={idx}>
                <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card px-5 py-4 shadow-[0_0_24px_rgba(220,38,38,0.06)]">
                  <div
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/30"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <p className="flex-1 font-bold text-foreground text-start leading-snug">
                    {benefit.text}
                  </p>
                </div>
              </HoverLift>
            );
          })}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default Benefits;
