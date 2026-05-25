import { motion } from 'motion/react';
import { heroData } from '../../constants';
import { fadeIn } from '../../utils/motion';
import HeroScene from '../canvas/HeroScene';
import { useNormalizedMouse } from '../../hooks/useMousePosition';
import { HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { CharReveal, WordReveal } from '../ui/TextReveal';
import MagneticButton from '../ui/MagneticButton';
import profileImg from '../../assets/photo.png';

const Hero = () => {
  const mouse = useNormalizedMouse();

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section id="hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <HeroScene mouse={mouse} />

      {/* Ambient depth layers */}
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 80% at 68% 50%, var(--accent-glow-subtle) 0%, transparent 65%)', pointerEvents: 'none', zIndex: 1, opacity: 0.4 }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '220px', background: 'linear-gradient(to top, var(--bg-base), transparent)', pointerEvents: 'none', zIndex: 1 }} />

      {/* Content */}
      <div className="container-main" style={{ position: 'relative', zIndex: 2, paddingTop: '130px', paddingBottom: '100px' }}>
        <div style={{ maxWidth: '680px' }}>

          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '10px',
              padding: '8px 18px 8px 12px',
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-light)',
              borderRadius: '100px',
              marginBottom: '32px',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)'
            }}
          >
            <span style={{
              width: '8px', height: '8px', borderRadius: '50%',
              background: 'var(--accent-primary)',
              boxShadow: '0 0 10px var(--accent-primary)',
              animation: 'pulse-glow 2s ease-in-out infinite',
            }} />
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.05em' }}>
              Available for new projects
            </span>
          </motion.div>

          {/* Greeting */}
          <CharReveal delay={0.2} stagger={0.03} as="p" style={{
            fontSize: 'clamp(0.8rem, 1.6vw, 0.95rem)',
            color: 'var(--accent-primary)',
            fontFamily: 'var(--font-body)',
            fontWeight: 600,
            marginBottom: '12px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
          }}>
            {heroData.greeting}
          </CharReveal>

          {/* Name Container */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(16px, 4vw, 32px)', marginBottom: '20px', flexWrap: 'wrap' }}>
            {/* Profile Icon with Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -15 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 0deg, var(--accent-primary), var(--accent-light), transparent 60%)',
                  zIndex: 0,
                  filter: 'blur(3px)',
                  opacity: 0.8
                }}
              />
              <div style={{ position: 'absolute', inset: '-2px', background: 'var(--bg-base)', borderRadius: '50%', zIndex: 1 }} />
              <img
                src={profileImg}
                alt="Profile"
                style={{
                  width: 'clamp(64px, 10vw, 96px)',
                  height: 'clamp(64px, 10vw, 96px)',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  position: 'relative',
                  zIndex: 2,
                  border: '2px solid var(--border-light)',
                  boxShadow: '0 0 24px var(--accent-glow-subtle)'
                }}
              />
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
              style={{
                fontSize: 'clamp(3.5rem, 9vw, 6.5rem)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                lineHeight: 0.95,
                letterSpacing: '-0.04em',
                color: 'var(--text-primary)',
                margin: 0
              }}
            >
              {heroData.name}
            </motion.h1>
          </div>

          {/* Title */}
          <WordReveal delay={0.6} as="h2" style={{
            fontSize: 'clamp(1.1rem, 3vw, 1.8rem)',
            fontFamily: 'var(--font-heading)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            marginBottom: '20px',
            letterSpacing: '0.02em',
          }}>
            {heroData.title}
          </WordReveal>

          {/* Tagline */}
          <WordReveal delay={0.85} as="p" style={{
            fontSize: 'clamp(0.92rem, 1.8vw, 1.08rem)',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            marginBottom: '46px',
            maxWidth: '500px',
            fontWeight: 300,
          }}>
            {heroData.tagline}
          </WordReveal>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
          >
            <MagneticButton>
              <button className="btn-primary" onClick={() => handleScroll('projects')} style={{
                background: 'var(--accent-primary)',
                borderColor: 'var(--accent-light)',
                boxShadow: '0 8px 30px var(--accent-glow-subtle)'
              }}>
                <span>View Projects</span>
              </button>
            </MagneticButton>
            <MagneticButton>
              <button className="btn-outline" onClick={() => handleScroll('contact')} style={{
                borderColor: 'var(--border-medium)',
                background: 'rgba(255,255,255,0.02)'
              }}>
                Contact Me
              </button>
            </MagneticButton>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '12px', marginLeft: '8px' }}>
              {[
                { href: 'https://github.com/Ashay1111-at', Icon: FaGithub, label: 'GitHub' },
                { href: 'https://www.linkedin.com/in/ashay-thorat-37612025a/', Icon: FaLinkedin, label: 'LinkedIn' },
              ].map(({ href, Icon, label }) => (
                <motion.a
                  key={label}
                  href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  whileHover={{ scale: 1.15, y: -4, backgroundColor: 'var(--bg-glass-hover)', borderColor: 'var(--accent-primary)', color: '#fff' }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5 }}
                  style={{
                    width: '46px', height: '46px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    borderRadius: '12px',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-light)',
                    color: 'var(--text-muted)',
                    fontSize: '1.2rem',
                    transition: 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                  }}
                >
                  <Icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => handleScroll('about')}
        style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          cursor: 'pointer', zIndex: 2,
        }}
      >
        <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 500 }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ color: 'var(--accent-primary)', fontSize: '1.2rem' }}
        >
          <HiArrowDown />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
