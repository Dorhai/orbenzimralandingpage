import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import {
  fadeDown,
  fadeDownReduced,
  menuContainer,
  motionVariant,
  EASE_OUT,
} from '@/lib/animations';
import { useMotionSafe } from '@/lib/animations';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { reduced, menuItem, hoverScaleSubtle } = useMotionSafe();
  const navVariants = motionVariant(reduced, fadeDown, fadeDownReduced);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 80);
  });

  return (
    <motion.nav
      className={`fixed w-full z-50 top-0 left-0 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md'
          : 'bg-white/95 backdrop-blur-sm shadow-sm'
      }`}
      variants={navVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={`max-w-7xl mx-auto px-6 transition-[padding] duration-300 ${scrolled ? 'py-2' : 'py-4'}`}>
        <div className="flex items-center justify-between">

          {/* Brand (Right side in RTL) */}
          <a href="#home" className="flex items-center" aria-label={siteContent.gym.name}>
            <Logo variant="compact" />
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {siteContent.nav.links.map((link, idx) => (
                <motion.a
                  key={idx}
                  href={link.href}
                  className="text-gray-900 hover:text-gray-600 transition-colors font-medium"
                  whileHover={hoverScaleSubtle}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <Button asChild className="rounded-full px-6">
              <motion.a
                href="#contact"
                whileHover={hoverScaleSubtle}
                whileTap={{ scale: 0.98 }}
              >
                {siteContent.nav.cta}
              </motion.a>
            </Button>
          </div>

          {/* Mobile Menu – AnimatePresence dropdown */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              aria-label="תפריט"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              className="fixed inset-0 top-[65px] bg-black/20 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown panel – fades & slides down */}
            <motion.div
              key="menu"
              className="absolute top-full start-0 w-full bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100 z-50 md:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: EASE_OUT }}
            >
              <motion.div
                className="flex flex-col px-6 py-4 gap-1"
                variants={menuContainer}
                initial="hidden"
                animate="visible"
              >
                {siteContent.nav.links.map((link, idx) => (
                  <motion.a
                    key={idx}
                    href={link.href}
                    variants={menuItem}
                    onClick={() => setIsOpen(false)}
                    className="text-gray-900 hover:text-gray-600 font-medium block py-3 border-b border-gray-100"
                  >
                    {link.label}
                  </motion.a>
                ))}
                <motion.div variants={menuItem} className="pt-2">
                  <Button asChild className="rounded-full w-full" onClick={() => setIsOpen(false)}>
                    <a href="#contact">{siteContent.nav.cta}</a>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
