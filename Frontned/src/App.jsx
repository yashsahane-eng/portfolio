import React from 'react';
import StarCursor from './components/StarCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import './index.css'; // Ensure your Tailwind styles are imported

function App() {
  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <StarCursor />
      <Navbar />
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <footer className="py-10 text-center text-gray-500 border-t border-gray-800">
        <p>© 2026 Yash Sahane  • Pune, India </p>
      </footer>
    </div>
  );
}

export default App;