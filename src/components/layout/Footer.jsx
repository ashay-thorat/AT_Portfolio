import { motion } from 'motion/react';
import { FaArrowUp } from 'react-icons/fa';
import { socialLinks, navLinks } from '../../constants';

const Footer = () => {
  const goTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const go = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <footer style={{ borderTop: '1px solid var(--border-medium)', padding: '60px 0 30px', position: 'relative', background: 'var(--bg-main)' }}>
      {/* Subtle top glow line */}
      <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: '300px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--accent-primary), transparent)', opacity: 0.6 }} />

      <div className="container-main">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px' }}>

          {/* Brand */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginBottom: '16px', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.03em' }}>
              AT<span style={{ color: 'var(--accent-primary)' }}>.</span>
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '240px', fontWeight: 300 }}>
              Building digital experiences that push the boundaries of web technology.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 600 }}>
              Navigation
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => go(link.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'var(--text-secondary)', fontSize: '0.88rem',
                    textAlign: 'left', padding: 0, transition: 'color 0.2s ease, text-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => { e.target.style.color = 'var(--accent-primary)'; }}
                  onMouseLeave={(e) => { e.target.style.color = 'var(--text-secondary)'; }}
                >
                  {link.title}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-muted)', marginBottom: '16px', fontWeight: 600 }}>
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialLinks.map((s) => (
                <motion.a
                  key={s.platform}
                  href={s.url} target="_blank" rel="noopener noreferrer"
                  whileHover={{ scale: 1.12, y: -3 }} whileTap={{ scale: 0.95 }}
                  style={{
                    width: '40px', height: '40px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '10px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-secondary)', fontSize: '1rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.background = 'var(--bg-raised)';
                    e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'var(--border-light)';
                    e.currentTarget.style.background = 'var(--bg-glass)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                  aria-label={s.platform}
                >
                  <s.icon />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: '1px', background: 'linear-gradient(90deg, transparent, var(--border-medium), transparent)', marginBottom: '24px' }} />

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 300 }}>
            © {new Date().getFullYear()} Ashay Thorat. Crafted with care.
          </p>
          <motion.button
            onClick={goTop}
            whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}
            style={{
              width: '38px', height: '38px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              borderRadius: '10px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-light)',
              color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.85rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.background = 'var(--bg-raised)'; 
              e.currentTarget.style.color = '#fff'; 
              e.currentTarget.style.borderColor = 'var(--accent-primary)'; 
              e.currentTarget.style.boxShadow = '0 4px 15px var(--accent-glow-subtle)'; 
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.background = 'var(--bg-glass)'; 
              e.currentTarget.style.color = 'var(--text-secondary)'; 
              e.currentTarget.style.borderColor = 'var(--border-light)'; 
              e.currentTarget.style.boxShadow = 'none'; 
            }}
            aria-label="Back to top"
          >
            <FaArrowUp />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
