import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Skills from './components/sections/Skills';
import Projects from './components/sections/Projects';
import Experience from './components/sections/Experience';
import Certificates from './components/sections/Certificates';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import CustomCursor from './components/ui/CustomCursor';

const App = () => {
  return (
    <>
      <CustomCursor />
      
      {/* Global Background Layers */}
      <div className="bg-grid" />
      <div className="bg-noise" />
      <div className="ambient-glow" />
      
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '1440px', margin: '0 auto', padding: '0 5vw' }}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Experience />
        <Contact />
      </main>
    </>
  );
};

export default App;
