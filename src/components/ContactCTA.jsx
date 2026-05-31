import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import { siteContent } from '../data/siteContent';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import MagneticWrapper from './MagneticWrapper';
import ShineButton from './ShineButton';
import { useMotionSafe, staggerContainer, fadeUp, fadeUpReduced, motionVariant } from '@/lib/animations';

const ContactCTA = () => {
  const { hoverScaleSubtle, tapScale, reduced } = useMotionSafe();
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'center center'],
  });

  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });

  const xRight = useTransform(progress, [0, 1], reduced ? [0, 0] : [80, 0]);
  const xLeft = useTransform(progress, [0, 1], reduced ? [0, 0] : [-80, 0]);
  const opacity = useTransform(progress, [0, 1], [0, 1]);

  const rowContainer = staggerContainer(0.12, 0.1);
  const rowItem = motionVariant(reduced, fadeUp, fadeUpReduced);

  return (
    <section ref={sectionRef} id="contact" className="relative overflow-hidden py-24 bg-[#202A36] text-white">
      {/* Drifting background orbs */}
      <motion.div
        aria-hidden
        className="absolute top-0 left-0 w-96 h-96 bg-white/[0.04] rounded-full blur-3xl pointer-events-none"
        animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-white/[0.03] rounded-full blur-3xl pointer-events-none"
        animate={reduced ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          <motion.div style={{ x: xRight, opacity }}>
            <div className="text-start">
              <h2 className="text-4xl font-bold mb-6">
                {siteContent.contactCta.title}
              </h2>
              <p className="text-gray-300 text-lg mb-10 max-w-lg">
                {siteContent.contactCta.subtitle}
              </p>

              <motion.address
                className="not-italic space-y-6"
                variants={rowContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.3 }}
              >
                <motion.div variants={rowItem} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">טלפון</p>
                    <p className="text-lg font-medium" dir="ltr">{siteContent.contact.phone}</p>
                  </div>
                </motion.div>

                <motion.div variants={rowItem} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">אימייל</p>
                    <p className="text-lg font-medium">{siteContent.contact.email}</p>
                  </div>
                </motion.div>

                <motion.div variants={rowItem} className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">כתובת</p>
                    <p className="text-lg font-medium">{siteContent.contact.address}</p>
                  </div>
                </motion.div>
              </motion.address>
            </div>
          </motion.div>

          <motion.div style={{ x: xLeft, opacity }}>
            <Card className="text-gray-900 text-start">
              <CardContent>
                {/* טופס יצירת קשר - ניתן לחבר כאן שליחה אמיתית בעתיד / contact form goes here */}
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="space-y-2">
                    <Label htmlFor="name">שם מלא</Label>
                    <Input id="name" type="text" placeholder="ישראל ישראלי" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">טלפון</Label>
                    <Input id="phone" type="tel" dir="rtl" placeholder="050-000-0000" />
                  </div>

                  <MagneticWrapper className="w-full flex">
                    <motion.div whileHover={hoverScaleSubtle} whileTap={tapScale} className="w-full">
                      <ShineButton type="submit" size="lg" className="w-full rounded-xl text-lg">
                        {siteContent.contactCta.cta}
                      </ShineButton>
                    </motion.div>
                  </MagneticWrapper>
                </form>
              </CardContent>
            </Card>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
