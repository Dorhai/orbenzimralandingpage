import { useRef, useState } from 'react';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import { Mail } from 'lucide-react';

function InstagramIcon({ className }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

import { siteContent } from '../data/siteContent';

import { Card, CardContent } from '@/components/ui/card';

import { Input } from '@/components/ui/input';

import { Label } from '@/components/ui/label';

import ShineButton from './ShineButton';

import { useMotionSafe, staggerContainer, fadeUp, fadeUpReduced, motionVariant } from '@/lib/animations';
import { useMediaQuery } from '@/lib/useMediaQuery';



const initialForm = { name: '', phone: '', email: '' };



const ContactCTA = () => {

  const { reduced } = useMotionSafe();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const sectionRef = useRef(null);

  const [form, setForm] = useState(initialForm);

  const [status, setStatus] = useState('idle');

  const [message, setMessage] = useState('');



  const { scrollYProgress } = useScroll({

    target: sectionRef,

    offset: ['start end', 'center center'],

  });



  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });



  const slideEnabled = isDesktop && !reduced;

  const xRight = useTransform(progress, [0, 1], slideEnabled ? [80, 0] : [0, 0]);

  const xLeft = useTransform(progress, [0, 1], slideEnabled ? [-80, 0] : [0, 0]);

  const opacity = useTransform(progress, [0, 1], [0, 1]);



  const rowContainer = staggerContainer(0.12, 0.1);

  const rowItem = motionVariant(reduced, fadeUp, fadeUpReduced);



  const updateField = (field) => (e) => {

    setForm((prev) => ({ ...prev, [field]: e.target.value }));

    if (status !== 'idle') {

      setStatus('idle');

      setMessage('');

    }

  };



  const handleSubmit = async (e) => {

    e.preventDefault();

    setStatus('submitting');

    setMessage('');



    try {

      let res = await fetch('/api/contact', {

        method: 'POST',

        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify(form),

      });

      if (res.status === 502) {
        await new Promise((resolve) => {
          window.setTimeout(resolve, 800);
        });
        res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
      }



      const data = await res.json().catch(() => ({}));



      if (!res.ok) {

        setStatus('error');

        setMessage(
          data.error
            || (res.status === 502
              ? 'השרת מתחיל מחדש — נסו שוב בעוד רגע.'
              : siteContent.contactCta.error),
        );

        return;

      }



      setStatus('success');

      setMessage(siteContent.contactCta.success);

      setForm(initialForm);

    } catch {

      setStatus('error');

      setMessage(siteContent.contactCta.error);

    }

  };



  const isSubmitting = status === 'submitting';



  return (

    <section ref={sectionRef} id="contact" className="section-padding relative overflow-hidden bg-background text-foreground">

      <motion.div

        aria-hidden

        className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none"

        animate={reduced ? undefined : { x: [0, 60, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}

        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}

      />

      <motion.div

        aria-hidden

        className="absolute bottom-0 right-0 w-[28rem] h-[28rem] bg-primary/5 rounded-full blur-3xl pointer-events-none"

        animate={reduced ? undefined : { x: [0, -50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}

        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}

      />



      <div className="max-w-7xl mx-auto px-6 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">



          <motion.div style={{ x: xRight, opacity }}>

            <div className="text-start">

              <h2 className="section-heading mb-6">

                {siteContent.contactCta.title}

              </h2>

              <p className="text-muted-foreground text-lg mb-10 max-w-lg">

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

                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">

                    <Mail className="w-5 h-5" />

                  </div>

                  <div>

                    <p className="text-sm text-muted-foreground">אימייל</p>

                    <p className="text-lg font-medium">{siteContent.contact.email}</p>

                  </div>

                </motion.div>



                <motion.div variants={rowItem} className="flex items-center gap-4">

                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">

                    <InstagramIcon className="w-5 h-5" />

                  </div>

                  <div>

                    <p className="text-sm text-muted-foreground">אינסטגרם</p>

                    <a
                      href={siteContent.contact.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-foreground hover:text-primary underline-offset-4 hover:underline transition-colors"
                      dir="ltr"
                    >
                      {siteContent.contact.instagramHandle}
                    </a>

                  </div>

                </motion.div>

              </motion.address>

            </div>

          </motion.div>



          <motion.div style={{ x: xLeft, opacity }} className="min-w-0">

            <Card className="text-start overflow-hidden">

              <CardContent>

                <form className="space-y-6" onSubmit={handleSubmit} noValidate>

                  <div className="space-y-2">

                    <Label htmlFor="name">שם מלא</Label>

                    <Input

                      id="name"

                      name="name"

                      type="text"

                      dir="rtl"

                      placeholder="ישראל ישראלי"

                      value={form.name}

                      onChange={updateField('name')}

                      required

                      autoComplete="name"

                      disabled={isSubmitting}

                    />

                  </div>



                  <div className="space-y-2">

                    <Label htmlFor="phone">טלפון</Label>

                    <Input

                      id="phone"

                      name="phone"

                      type="tel"

                      dir="rtl"

                      placeholder="052-3469943"

                      value={form.phone}

                      onChange={updateField('phone')}

                      required

                      autoComplete="tel"

                      disabled={isSubmitting}

                    />

                  </div>



                  <div className="space-y-2">

                    <Label htmlFor="email">אימייל</Label>

                    <Input

                      id="email"

                      name="email"

                      type="email"

                      dir="rtl"

                      placeholder="name@example.com"

                      value={form.email}

                      onChange={updateField('email')}

                      required

                      autoComplete="email"

                      disabled={isSubmitting}

                    />

                  </div>



                  {message && (

                    <p

                      role="status"

                      className={`text-sm ${status === 'success' ? 'text-green-500' : 'text-destructive'}`}

                    >

                      {message}

                    </p>

                  )}



                  <ShineButton

                    type="submit"

                    size="lg"

                    className="w-full max-w-full rounded-xl text-lg"

                    disabled={isSubmitting}

                  >

                    {isSubmitting ? siteContent.contactCta.sending : siteContent.contactCta.cta}

                  </ShineButton>

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

