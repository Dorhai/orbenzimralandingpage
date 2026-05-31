import { motion } from 'framer-motion';
import { siteContent } from '../data/siteContent';
import Logo from './Logo';
import StaggerReveal from './StaggerReveal';
import { useMotionSafe } from '@/lib/animations';

const Footer = () => {
  const { hoverScaleSubtle } = useMotionSafe();

  return (
    <footer className="bg-gray-50 pt-16 pb-8 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">
        <StaggerReveal className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12" stagger={0.12}>

          <div className="flex flex-col items-center md:items-start">
            <Logo variant="full" />
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {siteContent.nav.links.map((link, idx) => (
              <motion.a
                key={idx}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
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
                className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 hover:text-gray-900 transition-colors"
                aria-label={social.platform}
                whileHover={hoverScaleSubtle}
              >
                <span className="text-sm font-medium">{social.platform[0]}</span>
              </motion.a>
            ))}
          </div>

        </StaggerReveal>

        <div className="text-center text-gray-400 text-sm border-t border-gray-200 pt-8">
          <p>&copy; {new Date().getFullYear()} {siteContent.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
