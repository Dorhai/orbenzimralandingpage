import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calculator, ChevronDown, Clock, Utensils, User } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import StaggerText from './StaggerText';
import Reveal from './Reveal';
import { useMotionSafe } from '@/lib/animations';

const faqIcons = { Calculator, Clock, Utensils, User };

const FAQItem = ({ item, index, isOpen, onToggle, reduced }) => {
  const Icon = faqIcons[item.icon] ?? User;
  const panelId = `faq-panel-${index}`;
  const buttonId = `faq-button-${index}`;

  return (
    <div className="rounded-xl border border-primary/20 bg-card shadow-[0_0_24px_rgba(220,38,38,0.06)] overflow-hidden">
      <button
        id={buttonId}
        type="button"
        className="flex w-full items-center gap-4 px-5 py-4 text-start"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
      >
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/30"
          aria-hidden
        >
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
        <span className="flex-1 font-bold text-foreground leading-snug">{item.question}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <p className="px-5 pb-4 ps-[4.75rem] text-muted-foreground leading-relaxed text-start">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQ = () => {
  const { faq } = siteContent;
  const { reduced, hoverScaleSubtle } = useMotionSafe();
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="section-padding bg-card">
      <div className="max-w-7xl mx-auto px-6">
        <div className="section-intro text-center">
          <StaggerText as="h2" text={faq.title} className="section-heading text-foreground" />
        </div>

        <div className="flex flex-col gap-4 max-w-3xl mx-auto">
          {faq.items.map((item, idx) => (
            <Reveal key={idx} delay={idx * 0.05}>
              <FAQItem
                item={item}
                index={idx}
                isOpen={openIndex === idx}
                onToggle={handleToggle}
                reduced={reduced}
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2} className="mt-10 flex justify-center px-2">
          <motion.a
            href="#contact"
            className={`hero-cta group max-w-full ${reduced ? 'hero-cta--static' : ''}`}
            whileHover={hoverScaleSubtle}
          >
            <span className="hero-cta-ring" aria-hidden />
            <span className="hero-cta-label hero-cta-label--wide">{faq.footnote}</span>
          </motion.a>
        </Reveal>
      </div>
    </section>
  );
};

export default FAQ;
