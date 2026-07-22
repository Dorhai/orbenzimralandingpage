import { motion, useScroll } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Philosophy from '../components/Philosophy';
import Programs from '../components/Programs';
import FAQ from '../components/FAQ';
import Benefits from '../components/Benefits';
import CoachingApp from '../components/CoachingApp';
import Gallery from '../components/Gallery';
import ContactCTA from '../components/ContactCTA';
import Footer from '../components/Footer';
import SectionDivider from '../components/SectionDivider';

function HomePage() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <main id="home" className="flex-1">
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Philosophy />
        <SectionDivider />
        <Benefits />
        <SectionDivider />
        <CoachingApp />
        <SectionDivider />
        <Gallery />
        <SectionDivider />
        <Programs />
        <SectionDivider />
        <FAQ />
        <SectionDivider />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default HomePage;
