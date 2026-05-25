import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { navLinks } from '../../constants';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const Navbar = () => {
  const [scrolled, setScrolled]         = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen]     = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navLinks.map((l) => document.getElementById(l.id));
      const pos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= pos) {
          setActiveSection(navLinks[i].id); break;
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
        padding: scrolled ? '10px 0' : '18px 0',
        background: scrolled ? 'rgba(5, 5, 15, 0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(24px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(24px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-medium)' : 'none',
        transition: 'all 0.35s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,240,255,0.03)' : 'none',
      }}
    >
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <div /> {/* Spacer to maintain layout if needed, or just remove if using justify-between */}

        {/* Desktop links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }} className="nav-desktop">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              onClick={() => go(link.id)}
              whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }}
              style={{
                background: activeSection === link.id ? 'var(--bg-glass-hover)' : 'transparent',
                border: activeSection === link.id ? '1px solid var(--accent-glow)' : '1px solid transparent',
                cursor: 'pointer',
                padding: '8px 18px', borderRadius: '8px',
                fontFamily: 'var(--font-body)',
                fontSize: '0.88rem',
                fontWeight: activeSection === link.id ? 600 : 500,
                color: activeSection === link.id ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
                letterSpacing: '0.2px',
                boxShadow: activeSection === link.id ? '0 4px 12px var(--accent-glow-subtle)' : 'none',
              }}
              onMouseEnter={(e) => { 
                if (activeSection !== link.id) { 
                  e.currentTarget.style.color = 'var(--accent-primary)';
                  e.currentTarget.style.background = 'var(--bg-glass)';
                } 
              }}
              onMouseLeave={(e) => { 
                if (activeSection !== link.id) { 
                  e.currentTarget.style.color = 'var(--text-secondary)';
                  e.currentTarget.style.background = 'transparent';
                } 
              }}
            >
              {link.title}
            </motion.button>
          ))}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="nav-mobile-toggle"
          style={{ 
            display: 'none', background: 'none', border: 'none', cursor: 'pointer', 
            color: 'var(--accent-primary)', fontSize: '1.5rem' 
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
              position: 'absolute', top: '100%', left: 0, right: 0,
              background: 'rgba(9, 9, 11, 0.98)',
              backdropFilter: 'blur(30px)',
              borderBottom: '1px solid var(--border-light)',
              padding: '16px 24px',
              display: 'flex', flexDirection: 'column', gap: '4px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
            }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => go(link.id)}
                style={{
                  background: activeSection === link.id ? 'var(--bg-glass-hover)' : 'transparent',
                  border: activeSection === link.id ? '1px solid var(--accent-primary)' : '1px solid transparent',
                  cursor: 'pointer',
                  padding: '14px 16px', borderRadius: '10px',
                  fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 500,
                  color: activeSection === link.id ? '#ffffff' : 'var(--text-secondary)',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                }}
              >
                {link.title}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
