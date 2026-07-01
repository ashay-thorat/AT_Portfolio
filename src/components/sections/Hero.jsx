import { motion } from 'motion/react';
import { heroData, socialLinks } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { HiArrowDown } from 'react-icons/hi';
import { CharReveal, WordReveal } from '../ui/TextReveal';
import MagneticButton from '../ui/MagneticButton';
import profileImg from '../../assets/photo.png';

const Hero = () => {
  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
  };

  return (
    <section 
      id="hero" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        paddingTop: '60px',
        overflow: 'visible' 
      }}
    >
      <motion.div className="container-main">
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1.2fr 0.8fr', 
          gap: '40px', 
          alignItems: 'center'
        }}>
          
          {/* Left Side: Typography & CTA */}
          <motion.div style={{ zIndex: 10, minWidth: 0 }}>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                padding: '8px 18px',
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-light)',
                borderRadius: '100px',
                marginBottom: '40px',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(225,29,72,0.1)'
              }}
            >
              <span style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: 'var(--accent-primary)',
                boxShadow: '0 0 10px var(--accent-primary)',
                animation: 'pulse-glow 2s ease-in-out infinite',
              }} />
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Available for new opportunities
              </span>
            </motion.div>

            {/* Massive Heading */}
            <div style={{ marginBottom: '24px' }}>
              <CharReveal delay={0.2} stagger={0.03} as="p" style={{
                fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                color: 'var(--accent-primary)',
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                marginBottom: '8px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {heroData.greeting}
              </CharReveal>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1, ease: [0.23, 1, 0.32, 1] }}
                style={{
                  fontSize: 'clamp(4rem, 8vw, 6rem)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 800,
                  lineHeight: 0.9,
                  letterSpacing: '-0.02em',
                  color: 'var(--text-primary)',
                  margin: '0 0 16px 0',
                  textShadow: '0 10px 30px rgba(0,0,0,0.5)'
                }}
              >
                {heroData.name}<span style={{ color: 'var(--accent-primary)' }}>.</span>
              </motion.h1>

              {/* Dynamic Title Roles */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: '12px', 
                  alignItems: 'center',
                  fontFamily: 'var(--font-serif)',
                  fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)'
                }}
              >
                <span>Full Stack Developer</span>
                <span style={{ color: 'var(--accent-primary)', fontSize: '1rem' }}>✦</span>
                <span>UI Enthusiast</span>
                <span style={{ color: 'var(--accent-primary)', fontSize: '1rem' }}>✦</span>
                <span>Creative Engineer</span>
              </motion.div>
            </div>

            {/* Brand Statement */}
            <WordReveal delay={0.8} as="p" style={{
              fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '48px',
              maxWidth: '600px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}>
              Building modern digital experiences with clean architecture, beautiful interfaces, and scalable solutions that push the boundaries of the web.
            </WordReveal>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}
            >
              <MagneticButton>
                <button className="btn-primary" onClick={() => handleScroll('projects')} style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
                  <span>View Projects</span>
                </button>
              </MagneticButton>
              <MagneticButton>
                <button className="btn-outline" onClick={() => window.open('/resume.pdf', '_blank')} style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
                  Resume
                </button>
              </MagneticButton>
              <MagneticButton>
                <button className="btn-outline" onClick={() => handleScroll('contact')} style={{ fontSize: '1.1rem', padding: '16px 32px' }}>
                  Contact
                </button>
              </MagneticButton>

              {/* Social icons */}
              <div style={{ display: 'flex', gap: '16px', marginLeft: '12px' }}>
                {socialLinks.map(({ url, icon: Icon, platform }) => (
                  <MagneticButton key={platform}>
                    <a
                      href={url} target="_blank" rel="noopener noreferrer" aria-label={platform}
                      className="social-btn"
                      style={{
                        width: '56px', height: '56px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'var(--bg-glass)',
                        border: '1px solid var(--border-medium)',
                        color: 'var(--text-primary)',
                        fontSize: '1.4rem'
                      }}
                    >
                      <Icon />
                    </a>
                  </MagneticButton>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Animated Profile Card */}
          <motion.div 
            style={{ display: 'flex', justifyContent: 'center', position: 'relative', minWidth: 0 }}
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Background Glows for card */}
            <div style={{
              position: 'absolute', inset: '-20%',
              background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 60%)',
              filter: 'blur(60px)', zIndex: 0
            }} />
            
            <div 
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                maxWidth: '450px',
                aspectRatio: '3/4',
                display: 'flex',
                flexDirection: 'column',
                perspective: '1000px'
              }}
            >
              <div style={{ 
                flex: 1, 
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img 
                  src={profileImg} 
                  alt="Ashay Thorat"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.1) grayscale(0.2)', borderRadius: '20px' }}
                />
                {/* Overlay gradient on image */}
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, var(--bg-base) 0%, transparent 40%)'
                }} />
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={() => handleScroll('about')}
        style={{
          position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
          cursor: 'pointer', zIndex: 20,
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600 }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          style={{ 
            color: 'var(--accent-primary)', 
            fontSize: '1.5rem',
            background: 'var(--bg-glass)',
            padding: '10px',
            borderRadius: '50%',
            border: '1px solid var(--border-light)'
          }}
        >
          <HiArrowDown />
        </motion.div>
      </motion.div>

      {/* Media Query for responsive grid handled in CSS or via styled components usually, here we can add a quick style tag */}
      <style>{`
        @media (max-width: 992px) {
          #hero > div > div {
            grid-template-columns: 1fr !important;
            text-align: center;
          }
          #hero .btn-primary, #hero .btn-outline {
            width: 100%;
          }
          #hero > div > div > div:nth-child(1) > div:last-child {
            justify-content: center;
          }
          #hero h1 {
            font-size: clamp(3.5rem, 10vw, 5rem) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
