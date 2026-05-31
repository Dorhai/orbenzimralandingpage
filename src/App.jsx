import { motion, useScroll } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Benefits from './components/Benefits';
import Testimonials from './components/Testimonials';
import Marquee from './components/Marquee';
import Pricing from './components/Pricing';
import Gallery from './components/Gallery';
import ContactCTA from './components/ContactCTA';
import Footer from './components/Footer';

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#202A36] origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <Navbar />
      <main id="home" className="flex-1">
        <Hero />
        <About />
        <Programs />
        <Benefits />
        <Testimonials />
        <Marquee />
        <Pricing />
        <Gallery />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;