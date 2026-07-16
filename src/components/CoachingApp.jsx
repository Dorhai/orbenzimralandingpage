import {
  Dumbbell,
  Utensils,
  Calculator,
  Weight,
  TrendingUp,
  Footprints,
} from 'lucide-react';
import { siteContent } from '../data/siteContent';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import StaggerText from './StaggerText';
import Reveal from './Reveal';

const featureIcons = {
  Dumbbell,
  Utensils,
  Calculator,
  Weight,
  TrendingUp,
  Footprints,
};

const CoachingApp = () => {
  const { coachingApp } = siteContent;

  return (
    <section id="app" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-intro text-center max-w-2xl mx-auto">
          <StaggerText as="h2" text={coachingApp.title} className="section-heading text-foreground" />
          <Reveal delay={0.15}>
            <p className="mt-4 text-muted-foreground leading-relaxed">{coachingApp.subtitle}</p>
          </Reveal>
        </div>

        <StaggerReveal
          className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto"
          stagger={0.08}
        >
          {coachingApp.features.map((feature, idx) => {
            const Icon = featureIcons[feature.icon] ?? Dumbbell;
            return (
              <HoverLift key={idx}>
                <div className="h-full rounded-xl border border-primary/20 bg-card px-6 py-6 text-center shadow-[0_0_24px_rgba(220,38,38,0.06)]">
                  <div
                    className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/30"
                    aria-hidden
                  >
                    <Icon className="h-5 w-5" strokeWidth={2} />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm">{feature.description}</p>
                </div>
              </HoverLift>
            );
          })}
        </StaggerReveal>

        <div className="mt-12 md:mt-16 about-story-block">
          <Reveal>
            <p className="about-story-line text-center">{coachingApp.closing.title}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <p
              className="about-story-line text-center mt-2"
              style={{ maxWidth: 'min(36rem, 92vw)' }}
            >
              {coachingApp.closing.text}{' '}
              <span className="about-story-highlight">{coachingApp.closing.highlight}</span>
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CoachingApp;
