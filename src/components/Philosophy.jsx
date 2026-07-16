import { Check, X } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import Reveal from './Reveal';
import StaggerReveal from './StaggerReveal';
import StaggerText from './StaggerText';
import HoverLift from './HoverLift';

const contrastIcons = { X, Check };

const renderEmpathyLine = (line) => {
  if (typeof line === 'string') return line;
  return line.redLine ? <span className="about-story-highlight">{line.text}</span> : line.text;
};

const ContrastRow = ({ item, variant }) => {
  const Icon = contrastIcons[item.icon] ?? Check;
  const isNegative = variant === 'not';

  return (
    <HoverLift>
      <div className="flex items-center gap-4 rounded-xl border border-primary/20 bg-card px-5 py-4 shadow-[0_0_24px_rgba(220,38,38,0.06)]">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border ${
            isNegative
              ? 'border-muted-foreground/30 bg-muted/40 text-muted-foreground'
              : 'border-primary/30 bg-primary/10 text-primary'
          }`}
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <p className="flex-1 font-bold text-foreground text-start leading-snug">{item.text}</p>
      </div>
    </HoverLift>
  );
};

const Philosophy = () => {
  const { philosophy } = siteContent;

  return (
    <section id="philosophy" className="section-padding bg-background">
      <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="text-start order-2 lg:order-1">
              <div className="mb-6">
                <p className="text-xl md:text-2xl font-bold text-primary mb-4">כן כאן</p>
                <StaggerReveal className="flex flex-col gap-4" stagger={0.08}>
                  {philosophy.contrast.yes.map((item, idx) => (
                    <ContrastRow key={idx} item={item} variant="yes" />
                  ))}
                </StaggerReveal>
              </div>
              <div>
                <p className="text-xl md:text-2xl font-bold text-primary mb-4">לא כאן</p>
                <StaggerReveal className="flex flex-col gap-4" stagger={0.08}>
                  {philosophy.contrast.not.map((item, idx) => (
                    <ContrastRow key={idx} item={item} variant="not" />
                  ))}
                </StaggerReveal>
              </div>
            </div>

            <div className="text-start order-1 lg:order-2">
              <div className="section-intro">
                <StaggerText as="h2" text={philosophy.title} className="section-heading text-foreground" />
              </div>
              <div className="about-story-block">
                {philosophy.empathy.map((line, idx) => (
                  <Reveal key={idx} delay={idx * 0.06}>
                    <p className="about-story-line text-start" style={{ maxWidth: 'min(36rem, 92vw)' }}>
                      {renderEmpathyLine(line)}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-12 md:mt-16 about-story-block">
            {philosophy.closing.map((line, idx) => (
              <Reveal key={idx} delay={idx * 0.06}>
                <p className="about-story-line text-center" style={{ maxWidth: 'min(40rem, 92vw)' }}>
                  <span className="about-story-highlight">{line}</span>
                </p>
              </Reveal>
            ))}
          </div>
        </div>
    </section>
  );
};

export default Philosophy;
