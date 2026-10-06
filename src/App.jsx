import { MotionConfig } from 'motion/react';
import { Background } from './components/Background';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Services } from './sections/Services';
import { Skills } from './sections/Skills';
import { Projects } from './sections/Projects';
import { Contact } from './sections/Contact';
import { useLiquidPointer } from './hooks/useLiquidPointer';

export default function App() {
  useLiquidPointer();

  return (
    // reducedMotion="user" turns movement off for visitors who ask for less motion
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full bg-ink px-4 py-2 font-medium text-night transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Experience />
        <Services />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
