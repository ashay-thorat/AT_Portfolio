import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'motion/react';
import SectionWrapper from '../ui/SectionWrapper';
import { aboutData } from '../../constants';
import { fadeIn } from '../../utils/motion';
import { WordReveal, BlurReveal } from '../ui/TextReveal';
import AnimatedCounter from '../ui/AnimatedCounter';
import aboutImg from '../../assets/photo.png'; // Reusing profile image for now

import { FaReact, FaNodeJs } from 'react-icons/fa';
import { SiJavascript, SiTypescript } from 'react-icons/si';

/* ── Stat Card ── */
const StatCard = ({ stat, index }) => {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      variants={fadeIn('up', 'spring', index * 0.1, 0.65)}
      style={{
        padding: '24px 20px',
        background: 'var(--bg-glass)',
        border: '1px solid var(--border-light)',
        borderRadius: '20px',
        textAlign: 'center',
        cursor: 'default',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(16px)',
        transition: 'all 0.4s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      whileHover={{
        background: 'var(--bg-glass-hover)',
        borderColor: 'var(--accent-primary)',
        y: -4,
        boxShadow: '0 12px 32px rgba(225,29,72,0.1), inset 0 0 0 1px rgba(225,29,72,0.2)',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '40px', height: '40px',
        background: 'radial-gradient(circle at top right, var(--accent-glow-subtle), transparent 70%)',
        borderRadius: '0 16px 0 0',
      }} />
      <div style={{
        fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
        fontFamily: 'var(--font-heading)',
        fontWeight: 800,
        color: 'var(--text-primary)',
        marginBottom: '4px',
        lineHeight: 1,
      }}>
        {isInView ? <AnimatedCounter target={stat.value} /> : '0'}+
      </div>
      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
        {stat.label}
      </div>
    </motion.div>
  );
};

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <SectionWrapper id="about">
      <div ref={containerRef} style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <WordReveal delay={0.1} as="p" style={{ 
            fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.25em', 
            color: 'var(--accent-primary)', marginBottom: '16px', fontWeight: 600 
          }}>
            Introduction
          </WordReveal>
          <WordReveal delay={0.2} as="h2" className="section-heading" style={{ margin: 0, color: 'var(--text-primary)' }}>
            About Me
          </WordReveal>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '0.9fr 1.1fr', 
          gap: 'clamp(40px, 8vw, 80px)', 
          alignItems: 'center'
        }} className="about-grid">

          {/* Left — Abstract Art / Bento Style instead of photo */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
            style={{ position: 'relative', width: '100%', aspectRatio: '4/5', borderRadius: '30px' }}
          >
            {/* Background decorative elements */}
            <div style={{ 
              position: 'absolute', top: '10%', left: '-5%', right: '10%', bottom: '5%',
              background: 'linear-gradient(135deg, var(--bg-surface), var(--bg-base))',
              borderRadius: '30px', border: '1px solid var(--border-light)',
              transform: 'rotate(-4deg)', zIndex: 0
            }} />

            {/* Orbit lines */}
            <div style={{ position: 'absolute', top: '-15%', left: '-15%', right: '-5%', bottom: '-15%', border: '1px dashed var(--border-medium)', borderRadius: '50%', opacity: 0.4, zIndex: 0, transform: 'rotate(20deg) scale(1.05)' }} />
            <div style={{ position: 'absolute', top: '-5%', left: '-5%', right: '5%', bottom: '-5%', border: '1px solid var(--border-medium)', borderRadius: '50%', opacity: 0.3, zIndex: 0, transform: 'rotate(-10deg)' }} />
            
            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ position: 'absolute', top: '-5%', left: '10%', zIndex: 2, background: 'var(--bg-glass)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(97, 218, 251, 0.3)', color: '#61dafb', backdropFilter: 'blur(10px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            >
              <FaReact size={28} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 20, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              style={{ position: 'absolute', bottom: '15%', left: '-15%', zIndex: 2, background: 'var(--bg-glass)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(247, 223, 30, 0.3)', color: '#f7df1e', backdropFilter: 'blur(10px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            >
              <SiJavascript size={28} />
            </motion.div>

            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              style={{ position: 'absolute', top: '20%', right: '-15%', zIndex: 2, background: 'var(--bg-glass)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(49, 120, 198, 0.3)', color: '#3178c6', backdropFilter: 'blur(10px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            >
              <SiTypescript size={28} />
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              style={{ position: 'absolute', bottom: '-5%', right: '10%', zIndex: 2, background: 'var(--bg-glass)', padding: '12px', borderRadius: '50%', border: '1px solid rgba(60, 135, 58, 0.3)', color: '#3c873a', backdropFilter: 'blur(10px)', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}
            >
              <FaNodeJs size={28} />
            </motion.div>
            
            <motion.div style={{ 
              position: 'absolute', inset: 0, zIndex: 1,
              borderRadius: '30px', overflow: 'hidden',
              background: 'var(--bg-elevated)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              y: imgY,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
              {/* Dynamic Glow Background */}
              <div style={{ 
                position: 'absolute', inset: 0, 
                background: 'radial-gradient(circle at 50% 20%, rgba(225,29,72,0.15) 0%, transparent 60%)' 
              }} />
              
              {/* Massive Monogram Background */}
              <div style={{ 
                position: 'absolute', 
                fontSize: 'clamp(15rem, 25vw, 25rem)', 
                fontFamily: 'var(--font-heading)', 
                fontWeight: 900, 
                color: 'rgba(255,255,255,0.02)',
                lineHeight: 1,
                left: '50%',
                top: '40%',
                transform: 'translate(-50%, -50%)',
                pointerEvents: 'none',
                userSelect: 'none'
              }}>
                AT
              </div>

              {/* Code Snippet Card */}
              <motion.div 
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{
                  background: 'rgba(9, 3, 3, 0.7)',
                  border: '1px solid var(--border-medium)',
                  borderRadius: '16px',
                  padding: '24px',
                  width: '75%',
                  backdropFilter: 'blur(12px)',
                  zIndex: 2,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                  fontFamily: 'monospace',
                  fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '60px' // Leave room for the bottom badge
                }}
              >
                <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#eab308' }} />
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#22c55e' }} />
                </div>
                <div>
                  <span style={{ color: '#c678dd' }}>const</span> <span style={{ color: '#61afef' }}>developer</span> = {'{'}
                </div>
                <div style={{ paddingLeft: '20px' }}>
                  name: <span style={{ color: '#98c379' }}>'Ashay Thorat'</span>,<br/>
                  role: <span style={{ color: '#98c379' }}>'Creative Engineer'</span>,<br/>
                  passion: <span style={{ color: '#98c379' }}>'Building immersive UIs'</span>,<br/>
                  status: <span style={{ color: '#d19a66' }}>200</span>
                </div>
                <div>{'}'};</div>
              </motion.div>
              
              {/* Overlay Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                style={{
                  position: 'absolute', bottom: '30px', left: '30px', right: '30px',
                  background: 'var(--bg-glass)', backdropFilter: 'blur(16px)',
                  padding: '20px', borderRadius: '20px', border: '1px solid var(--border-light)',
                  display: 'flex', alignItems: 'center', gap: '16px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                }}
              >
                <div style={{ 
                  width: '50px', height: '50px', borderRadius: '12px', 
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-tertiary))', 
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'var(--font-heading)', fontWeight: 'bold', fontSize: '1.2rem',
                  boxShadow: '0 4px 15px var(--accent-glow-subtle)'
                }}>
                  AT
                </div>
                <div>
                  <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '1.1rem', marginBottom: '4px' }}>Ashay Thorat</div>
                  <div style={{ color: 'var(--accent-primary)', fontSize: '0.8rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>Creative Developer</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right — text + stats */}
          <motion.div variants={fadeIn('up', 'tween', 0.2, 0.8)} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <BlurReveal delay={0.3} as="p" style={{
              fontSize: 'clamp(1rem, 1.2vw, 1.15rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '32px',
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
            }}>
              {aboutData.intro}
            </BlurReveal>

            {/* Tech chips */}
            <div style={{ marginBottom: '16px', fontSize: '0.8rem', color: 'var(--text-primary)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Core Technologies
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '48px' }}>
              {['React', 'Next.js', 'Node.js', 'Three.js', 'TypeScript', 'Tailwind', 'PostgreSQL'].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  style={{
                    padding: '8px 16px',
                    fontSize: '0.8rem', fontWeight: 500,
                    fontFamily: 'var(--font-body)',
                    background: 'var(--bg-glass)',
                    border: '1px solid var(--border-medium)',
                    borderRadius: '100px',
                    color: 'var(--text-secondary)',
                    letterSpacing: '0.05em',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                  }}
                  whileHover={{ 
                    color: '#fff', borderColor: 'var(--accent-primary)', 
                    background: 'var(--accent-primary)', boxShadow: '0 4px 15px rgba(225,29,72,0.2)',
                    y: -2
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              {aboutData.highlights.map((stat, i) => (
                <StatCard key={stat.label} stat={stat} index={i} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </SectionWrapper>
  );
};

export default About;
