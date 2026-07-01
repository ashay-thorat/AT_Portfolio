import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navLinks } from '../../constants';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setNavVisible(false);
      } else {
        setNavVisible(true);
      }
      
      setScrolled(currentScrollY > 50);
      setLastScrollY(currentScrollY);

      // Active section detection
      const sections = navLinks.map((l) => document.getElementById(l.id));
      const pos = currentScrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= pos) {
          setActiveSection(navLinks[i].id); break;
        }
      }
    };
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [lastScrollY]);

  const go = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: navVisible ? 0 : -100 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed', top: scrolled ? '20px' : '0px', left: 0, right: 0, zIndex: 1000,
        padding: '0 5vw',
        transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
      }}
    >
      <div 
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          maxWidth: '1440px', margin: '0 auto',
          padding: scrolled ? '12px 24px' : '24px 0',
          background: scrolled ? 'var(--bg-glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid var(--border-light)' : '1px solid transparent',
          borderRadius: scrolled ? '100px' : '0px',
          boxShadow: scrolled ? '0 10px 40px rgba(0,0,0,0.5), 0 0 20px var(--accent-glow-subtle)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      >
        {/* Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <div style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontFamily: 'var(--font-heading)', fontWeight: 'bold', fontSize: '1.2rem',
            boxShadow: '0 0 15px var(--accent-glow)'
          }}>
            A
          </div>
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            Thorat<span style={{ color: 'var(--accent-primary)' }}>.</span>
          </span>
        </motion.div>

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }} className="nav-desktop">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <motion.button
                key={link.id}
                onClick={() => go(link.id)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                style={{
                  position: 'relative',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px 16px', borderRadius: '100px',
                  fontFamily: 'var(--font-body)',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transition: 'color 0.3s ease',
                  letterSpacing: '0.5px',
                  overflow: 'hidden'
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'var(--bg-glass-hover)',
                      border: '1px solid var(--accent-glow)',
                      borderRadius: '100px',
                      boxShadow: '0 0 10px var(--accent-glow-subtle)',
                      zIndex: -1
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <span style={{ position: 'relative', zIndex: 1 }}>{link.title}</span>
              </motion.button>
            )
          })}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-toggle"
          style={{ 
            display: 'none', background: 'var(--bg-glass)', border: '1px solid var(--border-light)', 
            cursor: 'pointer', color: 'var(--text-primary)', fontSize: '1.2rem',
            padding: '8px', borderRadius: '50%', backdropFilter: 'blur(10px)'
          }}
        >
          {mobileOpen ? <HiX /> : <HiMenuAlt3 />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            style={{
              position: 'absolute', top: '100%', left: '5vw', right: '5vw', marginTop: '10px',
              background: 'var(--bg-glass-hover)',
              backdropFilter: 'blur(30px)',
              border: '1px solid var(--border-light)',
              borderRadius: '24px',
              padding: '24px',
              display: 'flex', flexDirection: 'column', gap: '8px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.8), 0 0 30px var(--accent-glow-subtle)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => go(link.id)}
                style={{
                  background: activeSection === link.id ? 'linear-gradient(90deg, var(--bg-glass-hover), transparent)' : 'transparent',
                  border: 'none',
                  borderLeft: activeSection === link.id ? '2px solid var(--accent-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '12px 16px', borderRadius: '0 8px 8px 0',
                  fontFamily: 'var(--font-heading)', fontSize: '1.2rem', fontWeight: 600,
                  color: activeSection === link.id ? '#ffffff' : 'var(--text-secondary)',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  letterSpacing: '1px'
                }}
              >
                {link.title}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 1024px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
