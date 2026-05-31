import { siteContent } from '../data/siteContent';
import { Card, CardContent } from '@/components/ui/card';
import Reveal from './Reveal';
import StaggerReveal from './StaggerReveal';
import HoverLift from './HoverLift';
import StaggerText from './StaggerText';
import Counter from './Counter';

const About = () => {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <StaggerText text={siteContent.about.title} className="text-4xl font-bold text-gray-900 mb-6" />
          <Reveal delay={0.2}>
            <p className="text-xl text-gray-600 leading-relaxed">
              {siteContent.about.paragraph}
            </p>
          </Reveal>
        </div>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.1}>
          {siteContent.about.stats.map((stat, idx) => (
            <HoverLift key={idx}>
              <Card className="text-center bg-gray-50 border-gray-100 h-full">
                <CardContent>
                  <div className="text-5xl font-bold text-[#202A36] mb-2">
                    <Counter from={0} to={stat.value} />
                  </div>
                  <div className="text-gray-600 font-medium text-lg">{stat.label}</div>
                </CardContent>
              </Card>
            </HoverLift>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
};

export default About;
