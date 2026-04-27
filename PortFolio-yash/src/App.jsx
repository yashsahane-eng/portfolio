import React from 'react';
import AnimatedBackground from './components/AnimatedBackground';
import StarCursor from './components/StarCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import ScrollReveal from './components/ScrollReveal';
import './index.css';

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white relative">
      <AnimatedBackground />
      <StarCursor />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        <ScrollReveal direction="up" delay={100}>
          <Experience />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={100}>
          <Projects />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={100}>
          <Skills />
        </ScrollReveal>
        
        <ScrollReveal direction="up" delay={100}>
          <Contact />
        </ScrollReveal>
      </main>

      <footer className="py-10 text-center text-gray-500 border-t border-gray-800 relative z-10">
        <p>© 2026 Yash Sahane  • Pune, India </p>
      </footer>
    </div>
  );
}

export default App;