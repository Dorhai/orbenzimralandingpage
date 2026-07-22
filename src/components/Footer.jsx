import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { siteContent } from '../data/siteContent';
import Logo from './Logo';
import StaggerReveal from './StaggerReveal';
import { useMotionSafe } from '@/lib/animations';

const Footer = () => {
  const { hoverScaleSubtle } = useMotionSafe();

  return (
    <footer className="bg-background pt-16 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerReveal className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 mb-12" stagger={0.12}>

          <div className="flex flex-col items-center md:items-start">
            <Logo variant="full" />
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {siteContent.nav.links.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                className="text-muted-foreground hover:text-foreground font-medium transition-colors"
                whileHover={hoverScaleSubtle}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {siteContent.footer.social.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.url}
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label={social.platform}
                whileHover={hoverScaleSubtle}
              >
                <span className="text-sm font-medium">{social.platform[0]}</span>
              </motion.a>
            ))}
          </div>

        </StaggerReveal>

        <div className="text-center text-muted-foreground text-sm border-t border-border pt-8">
          <nav
            className="flex flex-wrap justify-center items-center gap-x-1 gap-y-2 mb-4"
            aria-label="מסמכים משפטיים"
          >
            {siteContent.footer.legalLinks.map((link, index) => (
              <span key={link.href} className="inline-flex items-center">
                {index > 0 && (
                  <span className="mx-2 text-muted-foreground/60" aria-hidden="true">
                    ·
                  </span>
                )}
                <Link
                  to={link.href}
                  className="hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </span>
            ))}
          </nav>
          <p>&copy; {new Date().getFullYear()} {siteContent.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
